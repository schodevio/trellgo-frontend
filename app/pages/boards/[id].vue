<template>
  <NuxtLayout name="app">
    <div class="board-detail-page">
      <div v-if="boardsStore.loading" class="boards-page__loading">
        <ProgressSpinner />
      </div>

      <template v-else-if="boardsStore.currentBoard">
        <div class="boards-page__header">
          <h1 class="boards-page__title">{{ boardsStore.currentBoard.name }}</h1>
        </div>
        <!-- Columns will be inserted here in Phase 6 -->
      </template>

      <div v-else class="boards-page__empty">
        <p class="boards-page__empty-text">Board not found.</p>
        <NuxtLink to="/boards">
          <Button label="Back to boards" text />
        </NuxtLink>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

import { useBoardsStore } from '~/stores/boards'

definePageMeta({ layout: false })

const route = useRoute()
const boardsStore = useBoardsStore()

onMounted(() => boardsStore.fetchBoard(route.params.id as string))
</script>
