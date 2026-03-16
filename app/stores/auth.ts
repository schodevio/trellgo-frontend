import { defineStore } from 'pinia'
import { ref } from 'vue'

import { setAccessToken } from '~/services/api'

import {
  authService,
  type LoginCredentials,
  type RegisterCredentials
} from '~/services/auth'

export const useAuthStore = defineStore('auth', () => {
  const isAuthenticated = ref(false)

  const initAuth = async () => {
    try {
      const data = await authService.refresh()

      setAccessToken(data.access_token)
      isAuthenticated.value = true
    } catch {
      setAccessToken(null)
      isAuthenticated.value = false
    }
  }

  const register = async (credentials: RegisterCredentials) => {
    await authService.register(credentials)
  }

  const login = async (credentials: LoginCredentials) => {
    const data = await authService.login(credentials)

    setAccessToken(data.access_token)
    isAuthenticated.value = true
  }

  const logout = async () => {
    try {
      await authService.logout()
    } finally {
      setAccessToken(null)
      isAuthenticated.value = false
    }
  }

  return {
    isAuthenticated,
    initAuth,
    register,
    login,
    logout,
  }
})
