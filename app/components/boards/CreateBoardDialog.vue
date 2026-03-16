<template>
  <Dialog
    :visible="visible"
    modal
    header="Create board"
    class="board-dialog"
    @update:visible="$emit('update:visible', $event)"
  >
    <form class="board-dialog__form" @submit.prevent="handleSubmit">
      <div class="auth-field">
        <label class="auth-field__label" for="create-board-name">Board name</label>
        <InputText
          id="create-board-name"
          v-model="name"
          placeholder="e.g. Sprint 1"
          :invalid="!!nameError"
          fluid
          autofocus
        />
        <small v-if="nameError" class="auth-field__error">{{ nameError }}</small>
      </div>
    </form>

    <template #footer>
      <Button label="Cancel" text severity="secondary" @click="$emit('update:visible', false)" />
      <Button label="Create" :loading="loading" @click="handleSubmit" />
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{ visible: boolean }>()
const emit = defineEmits<{
  'update:visible': [value: boolean]
  created: [name: string]
}>()

const name = ref('')
const nameError = ref('')
const loading = ref(false)

watch(() => props.visible, (val) => {
  if (val) {
    name.value = ''
    nameError.value = ''
  }
})

const handleSubmit = async () => {
  nameError.value = ''
  if (!name.value.trim()) {
    nameError.value = 'Board name is required.'
    return
  }
  loading.value = true
  try {
    emit('created', name.value.trim())
    emit('update:visible', false)
  } finally {
    loading.value = false
  }
}
</script>
