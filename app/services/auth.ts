import { apiService } from './api'

const BASE_URL = 'http://localhost:3000/api/v1'

export type LoginCredentials = {
  email: string
  password: string
}

export type RegisterCredentials = {
  email: string
  password: string
}

export type AuthTokenResponse = {
  access_token: string
}

export const authService = {
  login: (credentials: LoginCredentials) =>
    apiService.post<AuthTokenResponse>('/auth/login', credentials),

  register: (credentials: RegisterCredentials) =>
    apiService.post<void>('/auth/register', credentials),

  confirm: (token: string) =>
    apiService.post<void>('/auth/confirm', { token }),

  logout: () =>
    apiService.post<void>('/auth/logout'),

  // Called directly — bypasses withRefresh to avoid an infinite refresh loop
  refresh: () =>
    $fetch<AuthTokenResponse>('/auth/refresh', {
      method: 'POST',
      baseURL: BASE_URL,
      credentials: 'include'
    }),
}
