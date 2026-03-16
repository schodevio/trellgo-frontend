<template>
  <div class="board-card" @click="$emit('open', board.id)">
    <div class="board-card__body">
      <h3 class="board-card__name">{{ board.name }}</h3>
    </div>

    <div class="board-card__actions" @click.stop>
      <Button
        icon="pi pi-pencil"
        text
        rounded
        size="small"
        severity="secondary"
        class="board-card__action-btn"
        aria-label="Edit board"
        @click="$emit('edit', board)"
      />
      <Button
        icon="pi pi-trash"
        text
        rounded
        size="small"
        severity="danger"
        class="board-card__action-btn"
        aria-label="Delete board"
        @click="$emit('delete', board)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from 'primevue/button'
import type { Board } from '~/types/board'

defineProps<{ board: Board }>()
defineEmits<{
  open: [id: string]
  edit: [board: Board]
  delete: [board: Board]
}>()
</script>
