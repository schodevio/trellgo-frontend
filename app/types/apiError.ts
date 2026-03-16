export type ApiErrorBody = {
  code: string
  message: string
  details?: Record<string, string>
}

export type ApiErrorResponse = {
  error: ApiErrorBody
}

export class ApiError extends Error {
  readonly code: string
  readonly details?: Record<string, string>
  readonly status: number

  constructor(status: number, body: ApiErrorBody) {
    super(body.message)

    this.name = 'ApiError'
    this.code = body.code
    this.details = body.details
    this.status = status
  }

  get isUnauthorized() {
    return this.status === 401
  }

  get isValidation() {
    return this.status === 422 || this.code === 'VALIDATION_FAILED'
  }
}
