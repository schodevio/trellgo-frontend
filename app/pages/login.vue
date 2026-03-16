<template>
  <NuxtLayout name="auth">
    <div class="auth-heading">
      <h1 class="auth-heading__title">Welcome back</h1>
      <p class="auth-heading__subtitle">Sign in to continue to your boards.</p>
    </div>

    <Message
      v-if="error"
      severity="error"
      class="mb-5"
    >
      {{ error?.message }}
    </Message>

    <form class="auth-form" @submit.prevent="handleSubmit">
      <div class="auth-field">
        <label class="auth-field__label" for="email">Email</label>

        <InputText
          v-model="formData.email"
          :invalid="!!error?.details?.email"
          placeholder="you@example.com"
          autocomplete="email"
          type="email"
          id="email"
          fluid
        />

        <small
          v-if="error?.details?.email"
          class="auth-field__error"
        >
          {{ error?.details?.email }}
        </small>
      </div>

      <div class="auth-field">
        <label class="auth-field__label" for="password">Password</label>

        <Password
          v-model="formData.password"
          :invalid="!!error?.details?.password"
          autocomplete="current-password"
          :feedback="false"
          id="password"
          toggle-mask
          fluid
        />

        <small
          v-if="error?.details?.password"
          class="auth-field__error"
        >
          {{ error?.details?.password }}
        </small>
      </div>

      <Button
        type="submit"
        label="Sign in"
        class="mt-1"
        :loading
        fluid
      />
    </form>

    <div class="auth-links">
      <p>
        Don't have an account?
        <NuxtLink to="/register">Create one</NuxtLink>
      </p>

      <p>
        Didn't receive a confirmation email?
        <NuxtLink to="/confirm">Resend it</NuxtLink>
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

const formData = ref({
  email: '',
  password: ''
})

const loading = ref(false)
const error = ref<ApiError | null>(null)

const handleSubmit = async () => {
  loading.value = true
  error.value = null

  try {
    await authStore.login(formData.value)
    await navigateTo('/boards')
  } catch (err) {
    error.value = err
  } finally {
    loading.value = false
  }
}
</script>
