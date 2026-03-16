import { useAuthStore } from '~/stores/auth'

const publicRoutes = ['/', '/login', '/register', '/confirm']

export default defineNuxtRouteMiddleware(async (to) => {
  const authStore = useAuthStore()

  await callOnce('auth:init', () => authStore.initAuth())

  if (authStore.isAuthenticated && publicRoutes.includes(to.path)) {
    return navigateTo('/boards')
  }

  if (!authStore.isAuthenticated && !publicRoutes.includes(to.path)) {
    return navigateTo('/login')
  }
})
