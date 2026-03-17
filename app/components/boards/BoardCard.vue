<template>
  <div class="board-card" @click="$emit('open', board.id)">
    <div class="board-card__body">
      <h3 class="board-card__name">{{ board.name }}</h3>
    </div>

    <div class="board-card__actions" @click.stop>
      <Button
        @click="$emit('edit', board)"
        class="board-card__action-btn"
        aria-label="Edit board"
        severity="secondary"
        icon="ti ti-pencil"
        size="small"
        rounded
        text
      />
      <Button
        @click="$emit('delete', board)"
        class="board-card__action-btn"
        aria-label="Delete board"
        icon="ti ti-trash"
        severity="danger"
        size="small"
        rounded
        text
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { type PropType } from 'vue'

import { Button } from 'primevue'
import type { Board } from '~/types/board'

defineProps({
  board: {
    type: Object as PropType<Board>,
    required: true,
  }
})

defineEmits<{
  open: [id: string]
  edit: [board: Board]
  delete: [board: Board]
}>()
</script>
