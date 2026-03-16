import { describe, it, expect, vi, beforeEach } from 'vitest'
import { ApiError } from '~/types/apiError'

type FetchHooks = {
  onRequest: (ctx: { options: { headers?: unknown } }) => void
  onResponseError: (ctx: { response: { status: number; _data: unknown } }) => void
}

// ---------------------------------------------------------------------------
// Stub $fetch BEFORE api.ts loads — vi.hoisted runs before any import
// ---------------------------------------------------------------------------

const { mockClient, mockFetch, capturedHooks } = vi.hoisted(() => {
  const mockClient = vi.fn()
  const capturedHooks: { current: FetchHooks | null } = { current: null }

  const mockFetch = Object.assign(vi.fn(), {
    create: vi.fn((options: FetchHooks) => {
      capturedHooks.current = options
      return mockClient
    }),
  })

  vi.stubGlobal('$fetch', mockFetch)

  return {
    mockClient,
    mockFetch,
    capturedHooks
  }
})

import { apiService, setAccessToken, getAccessToken } from '../api'

// Hooks captured when api.ts called $fetch.create() on module load
const { onRequest, onResponseError } = capturedHooks.current!

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const makeHeaders = (init?: HeadersInit) => new Headers(init)

beforeEach(() => {
  mockClient.mockReset()
  mockFetch.mockReset()
  setAccessToken(null)
})

// ---------------------------------------------------------------------------
// Token management
// ---------------------------------------------------------------------------

describe('token management', () => {
  it('returns null when no token has been set', () => {
    expect(getAccessToken()).toBeNull()
  })

  it('stores and returns the access token', () => {
    setAccessToken('tok_abc')

    expect(getAccessToken()).toBe('tok_abc')
  })

  it('clears the token when set to null', () => {
    setAccessToken('tok_abc')
    setAccessToken(null)

    expect(getAccessToken()).toBeNull()
  })
})

// ---------------------------------------------------------------------------
// onRequest hook — Authorization header
// ---------------------------------------------------------------------------

describe('onRequest hook', () => {
  it('does not set Authorization header when no token is present', () => {
    const options: { headers?: unknown } = {}
    onRequest({ options })

    expect(options.headers).toBeUndefined()
  })

  it('sets Authorization header when a token is present', () => {
    setAccessToken('tok_xyz')

    const options: { headers?: unknown } = {}
    onRequest({ options })

    expect((options.headers as Headers).get('Authorization')).toBe('Bearer tok_xyz')
  })

  it('preserves existing headers while adding Authorization', () => {
    setAccessToken('tok_xyz')

    const options = { headers: makeHeaders({ 'X-Custom': 'value' }) }
    onRequest({ options })

    const headers = options.headers as Headers
    expect(headers.get('Authorization')).toBe('Bearer tok_xyz')
    expect(headers.get('X-Custom')).toBe('value')
  })
})

// ---------------------------------------------------------------------------
// onResponseError hook — error mapping
// ---------------------------------------------------------------------------

describe('onResponseError hook', () => {
  const invokeHook = (status: number, data: unknown) => {
    onResponseError({ response: { status, _data: data } })
  }

  it('throws ApiError mapped from the backend error envelope', () => {
    expect(() =>
      invokeHook(422, {
        error: {
          code: 'VALIDATION_FAILED',
          message: 'Invalid input',
          details: { email: 'required' } },
      }),
    ).toThrow(ApiError)
  })

  it('maps status, code, and details from the error envelope', () => {
    let err = new ApiError(0, { code: '', message: '' }) // Placeholder to satisfy type

    try {
      invokeHook(422, {
        error: {
          code: 'VALIDATION_FAILED',
          message: 'Invalid input',
          details: { email: 'required' } },
      })
    } catch (e) {
      err = e as ApiError
    }

    expect(err.status).toBe(422)
    expect(err.code).toBe('VALIDATION_FAILED')
    expect(err.message).toBe('Invalid input')
    expect(err.details).toEqual({ email: 'required' })
  })

  it('throws UNKNOWN_ERROR when the response has no error envelope', () => {
    let err = new ApiError(0, { code: '', message: '' }) // Placeholder to satisfy type

    try {
      invokeHook(500, {})
    } catch (e) {
      err = e as ApiError
    }

    expect(err).toBeInstanceOf(ApiError)
    expect(err.code).toBe('UNKNOWN_ERROR')
    expect(err.status).toBe(500)
  })
})

// ---------------------------------------------------------------------------
// HTTP methods — correct verb and body forwarded to client
// ---------------------------------------------------------------------------

describe('apiService HTTP methods', () => {
  beforeEach(() => {
    mockClient.mockResolvedValue({ ok: true })
  })

  it('get calls client with GET', async () => {
    await apiService.get('/boards')

    expect(mockClient).toHaveBeenCalledWith('/boards', { method: 'GET' })
  })

  it('post calls client with POST and body', async () => {
    const body = { name: 'My Board' }
    await apiService.post('/boards', body)

    expect(mockClient).toHaveBeenCalledWith('/boards', { method: 'POST', body })
  })

  it('put calls client with PUT and body', async () => {
    const body = { name: 'Renamed' }
    await apiService.put('/boards/1', body)

    expect(mockClient).toHaveBeenCalledWith('/boards/1', { method: 'PUT', body })
  })

  it('patch calls client with PATCH and body', async () => {
    const body = { name: 'Patched' }
    await apiService.patch('/boards/1', body)

    expect(mockClient).toHaveBeenCalledWith('/boards/1', { method: 'PATCH', body })
  })

  it('delete calls client with DELETE', async () => {
    await apiService.delete('/boards/1')

    expect(mockClient).toHaveBeenCalledWith('/boards/1', { method: 'DELETE' })
  })
})

// ---------------------------------------------------------------------------
// withRefresh — automatic token refresh on 401
// ---------------------------------------------------------------------------

describe('withRefresh', () => {
  it('returns response directly when no 401 occurs', async () => {
    mockClient.mockResolvedValue({ data: 'boards' })
    const result = await apiService.get('/boards')

    expect(result).toEqual({ data: 'boards' })
    expect(mockFetch).not.toHaveBeenCalled()
  })

  it('refreshes token and retries the request on 401', async () => {
    mockClient
      .mockRejectedValueOnce(new ApiError(401, { code: 'UNAUTHORIZED', message: 'Expired' }))
      .mockResolvedValueOnce({ data: 'boards' })

    mockFetch.mockResolvedValueOnce({ access_token: 'new-tok' })
    const result = await apiService.get('/boards')

    expect(result).toEqual({ data: 'boards' })
    expect(getAccessToken()).toBe('new-tok')
    expect(mockClient).toHaveBeenCalledTimes(2)
  })

  it('clears token and rethrows when refresh request fails', async () => {
    setAccessToken('old-tok')

    mockClient.mockRejectedValue(new ApiError(401, { code: 'UNAUTHORIZED', message: 'Expired' }))
    mockFetch.mockRejectedValueOnce(new Error('network error'))

    await expect(apiService.get('/boards')).rejects.toBeInstanceOf(ApiError)
    expect(getAccessToken()).toBeNull()
  })

  it('deduplicates concurrent refresh calls', async () => {
    const err401 = new ApiError(401, { code: 'UNAUTHORIZED', message: 'Expired' })

    mockClient
      .mockRejectedValueOnce(err401)
      .mockRejectedValueOnce(err401)
      .mockResolvedValue({ data: 'ok' })

    mockFetch.mockResolvedValue({ access_token: 'new-tok' })

    await Promise.all([apiService.get('/boards'), apiService.get('/boards')])

    // Even though two requests got 401, the refresh endpoint is only called once
    expect(mockFetch).toHaveBeenCalledTimes(1)
  })

  it('does not retry non-401 errors', async () => {
    mockClient.mockRejectedValue(new ApiError(403, { code: 'FORBIDDEN', message: 'Forbidden' }))

    await expect(apiService.get('/boards')).rejects.toMatchObject({ code: 'FORBIDDEN' })

    expect(mockClient).toHaveBeenCalledTimes(1)
    expect(mockFetch).not.toHaveBeenCalled()
  })
})
