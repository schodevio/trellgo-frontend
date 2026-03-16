import { ApiError, type ApiErrorResponse } from '~/types/apiError'

const BASE_URL = 'http://localhost:3000/api/v1'

type RequestBody = Record<string, any>

// ---------------------------------------------------------------------------
// Access token — held in module scope, never persisted to storage
// ---------------------------------------------------------------------------

let accessToken: string | null = null

export const setAccessToken = (token: string | null) => accessToken = token
export const getAccessToken = (): string | null => accessToken

// ---------------------------------------------------------------------------
// Token refresh — deduplicates concurrent calls
// ---------------------------------------------------------------------------

let refreshPromise: Promise<string | null> | null = null

const refreshAccessToken = async (): Promise<string | null> => {
  if (refreshPromise) return refreshPromise

  refreshPromise = $fetch<{ access_token: string }>('/auth/refresh', {
    method: 'POST',
    baseURL: BASE_URL,
    credentials: 'include',
  })
    .then(data => {
      setAccessToken(data.access_token)
      return accessToken
    })
    .catch(() => {
      setAccessToken(null)
      throw new ApiError(401, { code: 'UNAUTHORIZED', message: 'Session expired. Please log in again.' })
    })
    .finally(() => {
      refreshPromise = null
    })

  return refreshPromise
}

// ---------------------------------------------------------------------------
// Pre-configured $fetch instance
// ---------------------------------------------------------------------------

const client = $fetch.create({
  baseURL: BASE_URL,
  credentials: 'include',
  onRequest: ({ options }) => {
    if (accessToken) {
      options.headers = new Headers(options.headers)
      options.headers.set('Authorization', `Bearer ${accessToken}`)
    }
  },
  onResponseError: ({ response }) => {
    const body = response._data as ApiErrorResponse | undefined

    if (body?.error) {
      throw new ApiError(response.status, body.error)
    }

    throw new ApiError(response.status, {
      code: 'UNKNOWN_ERROR',
      message: 'An unexpected error occurred.',
    })
  },
})

// ---------------------------------------------------------------------------
// Retries fn once after a token refresh on 401
// ---------------------------------------------------------------------------

const withRefresh = async <T>(fn: () => Promise<T>): Promise<T> => {
  try {
    return await fn()
  } catch (err) {
    if (err instanceof ApiError && err.isUnauthorized) {
      await refreshAccessToken()
      return fn()
    }
    throw err
  }
}

// ---------------------------------------------------------------------------
// Public API service
// ---------------------------------------------------------------------------

export const apiService = {
  get: <T>(path: string): Promise<T> =>
    withRefresh(() => client<T>(path, { method: 'GET' })),

  post: <T>(path: string, body?: RequestBody): Promise<T> =>
    withRefresh(() => client<T>(path, { method: 'POST', body })),

  put: <T>(path: string, body?: RequestBody): Promise<T> =>
    withRefresh(() => client<T>(path, { method: 'PUT', body })),

  patch: <T>(path: string, body?: RequestBody): Promise<T> =>
    withRefresh(() => client<T>(path, { method: 'PATCH', body })),

  delete: <T>(path: string): Promise<T> =>
    withRefresh(() => client<T>(path, { method: 'DELETE' })),
}
