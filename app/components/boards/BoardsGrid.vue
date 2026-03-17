<template>
  <div class="boards-grid">
    <BoardCard
      v-for="board in boards"
      @open="$emit('open', $event)"
      @edit="$emit('edit', $event)"
      @delete="$emit('delete', $event)"
      :key="board.id"
      :board
    />
  </div>
</template>

<script setup lang="ts">
import { type PropType } from 'vue'
import type { Board } from '~/types/board'

defineProps({
  boards: {
    type: Array as PropType<Board[]>,
    default: () => [],
  }
})

defineEmits<{
  open: [id: string]
  edit: [board: Board]
  delete: [board: Board]
}>()
</script>
