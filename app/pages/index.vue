<template>
  <main class="flex flex-col items-center justify-center min-h-screen p-4">
    <h1 class="text-3xl font-bold mb-2">Welcome to TrellGo</h1>
    <p class="text-lg text-gray-500">Your Trello-like board manager.</p>

    <Button
      @click="handleClick"
      label="Get Started"
      class="mt-4"
      as="div"
    />
  </main>
</template>

<script setup lang="ts">
import { Button } from 'primevue'
import { apiService } from '~/services/api'

const handleClick = () => {
  apiService
    .get('/boards')
    .then((data) => {
      console.log('API response:', data)
    })
}
</script>
