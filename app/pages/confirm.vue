<template>
  <NuxtLayout name="auth">
    <!-- token present: confirm account -->
    <template v-if="token">
      <div class="auth-heading">
        <h1 class="auth-heading__title">Confirm your account</h1>
        <p class="auth-heading__subtitle">Click the button below to activate your account.</p>
      </div>

      <Message v-if="error" severity="error" class="mb-5">{{ error }}</Message>
      <Message v-if="confirmed" severity="success" class="mb-5">
        Account confirmed! Redirecting to sign in…
      </Message>

      <Button
        label="Confirm account"
        :loading="loading"
        :disabled="confirmed"
        fluid
        @click="handleConfirm"
      />

      <div class="auth-links">
        <NuxtLink to="/login">Back to sign in</NuxtLink>
      </div>
    </template>

    <!-- no token: post-registration landing -->
    <template v-else>
      <div class="auth-heading">
        <h1 class="auth-heading__title">Check your inbox</h1>
        <p class="auth-heading__subtitle">
          We've sent a confirmation email. Click the link inside to activate your account.
        </p>
      </div>

      <NuxtLink to="/login">
        <Button label="Back to sign in" severity="secondary" fluid />
      </NuxtLink>
    </template>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Button from 'primevue/button'
import Message from 'primevue/message'
import { authService } from '~/services/auth'
import { ApiError } from '~/types/apiError'

const route = useRoute()
const router = useRouter()

const token = route.query.token as string | undefined
const loading = ref(false)
const error = ref('')
const confirmed = ref(false)

const handleConfirm = async () => {
  if (!token) return

  loading.value = true
  error.value = ''

  try {
    await authService.confirm(token)
    confirmed.value = true
    setTimeout(() => router.push('/login'), 2000)
  } catch (err) {
    error.value = err instanceof ApiError ? err.message : 'An unexpected error occurred.'
  } finally {
    loading.value = false
  }
}
</script>
