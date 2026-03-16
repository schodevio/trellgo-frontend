<template>
  <NuxtLayout name="auth">
    <div class="auth-heading">
      <h1 class="auth-heading__title">Create your account</h1>
      <p class="auth-heading__subtitle">Start organising your work in seconds.</p>
    </div>

    <Message v-if="generalError" severity="error" class="mb-5">{{ generalError }}</Message>

    <form class="auth-form" @submit.prevent="handleSubmit">
      <div class="auth-field">
        <label class="auth-field__label" for="email">Email</label>
        <InputText
          id="email"
          v-model="email"
          type="email"
          placeholder="you@example.com"
          autocomplete="email"
          fluid
          :invalid="!!fieldErrors.email"
        />
        <small v-if="fieldErrors.email" class="auth-field__error">{{ fieldErrors.email }}</small>
      </div>

      <div class="auth-field">
        <label class="auth-field__label" for="password">Password</label>
        <Password
          id="password"
          v-model="password"
          toggle-mask
          autocomplete="new-password"
          fluid
          :invalid="!!fieldErrors.password"
        />
        <small v-if="fieldErrors.password" class="auth-field__error">{{ fieldErrors.password }}</small>
      </div>

      <Button type="submit" label="Create account" :loading="loading" fluid class="mt-1" />
    </form>

    <div class="auth-links">
      <p>
        Already have an account?
        <NuxtLink to="/login">Sign in</NuxtLink>
      </p>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '~/stores/auth'
import { ApiError } from '~/types/apiError'

definePageMeta({ layout: false })

const authStore = useAuthStore()

const email = ref('')
const password = ref('')
const loading = ref(false)
const generalError = ref('')
const fieldErrors = ref<Record<string, string>>({})

const handleSubmit = async () => {
  generalError.value = ''
  fieldErrors.value = {}
  loading.value = true

  try {
    await authStore.register({ email: email.value, password: password.value })
    await navigateTo('/confirm')
  } catch (err) {
    if (err instanceof ApiError) {
      if (err.isValidation && err.details) {
        fieldErrors.value = err.details
      } else {
        generalError.value = err.message
      }
    } else {
      generalError.value = 'An unexpected error occurred.'
    }
  } finally {
    loading.value = false
  }
}
</script>
