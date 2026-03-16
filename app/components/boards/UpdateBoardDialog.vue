<template>
  <Dialog
    :visible="visible"
    modal
    header="Rename board"
    class="board-dialog"
    @update:visible="$emit('update:visible', $event)"
  >
    <form class="board-dialog__form" @submit.prevent="handleSubmit">
      <div class="auth-field">
        <label class="auth-field__label" for="update-board-name">Board name</label>
        <InputText
          id="update-board-name"
          v-model="name"
          :invalid="!!nameError"
          fluid
          autofocus
        />
        <small v-if="nameError" class="auth-field__error">{{ nameError }}</small>
      </div>
    </form>

    <template #footer>
      <Button label="Cancel" text severity="secondary" @click="$emit('update:visible', false)" />
      <Button label="Save" :loading="loading" @click="handleSubmit" />
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import type { Board } from '~/types/board'

const props = defineProps<{
  visible: boolean
  board: Board | null
}>()

const emit = defineEmits<{
  'update:visible': [value: boolean]
  updated: [name: string]
}>()

const name = ref('')
const nameError = ref('')
const loading = ref(false)

watch(() => props.board, (board) => {
  if (board) name.value = board.name
}, { immediate: true })

watch(() => props.visible, (val) => {
  if (val) nameError.value = ''
})

const handleSubmit = async () => {
  nameError.value = ''
  if (!name.value.trim()) {
    nameError.value = 'Board name is required.'
    return
  }
  loading.value = true
  try {
    emit('updated', name.value.trim())
    emit('update:visible', false)
  } finally {
    loading.value = false
  }
}
</script>
