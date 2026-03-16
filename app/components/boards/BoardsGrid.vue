<template>
  <div class="boards-grid">
    <BoardCard
      v-for="board in boards"
      :key="board.id"
      :board="board"
      @open="$emit('open', $event)"
      @edit="$emit('edit', $event)"
      @delete="$emit('delete', $event)"
    />
  </div>
</template>

<script setup lang="ts">
import type { Board } from '~/types/board'

defineProps<{ boards: Board[] }>()
defineEmits<{
  open: [id: string]
  edit: [board: Board]
  delete: [board: Board]
}>()
</script>
