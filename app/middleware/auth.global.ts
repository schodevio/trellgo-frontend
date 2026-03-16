import { useAuthStore } from '~/stores/auth'

const publicRoutes = ['/', '/login', '/register', '/confirm']

export default defineNuxtRouteMiddleware((to) => {
  // Auth state lives in memory — only check on the client
  if (import.meta.server) return

  const authStore = useAuthStore()

  if (!authStore.isAuthenticated && !publicRoutes.includes(to.path)) {
    return navigateTo('/login')
  }
})
