<template>
  <Dialog
    @update:visible="$emit('update:visible', $event)"
    header="Create board"
    class="board-dialog"
    :visible
    modal
  >
    <form
      @submit.prevent="$emit('submit', localBoard)"
      class="board-dialog__form"
    >
      <div class="auth-field">
        <label class="auth-field__label" for="create-board-name">Board Name</label>

        <InputText
          id="create-board-name"
          v-model="localBoard.name"
          placeholder="e.g. Sprint 1"
          :invalid="!!errors.name"
          autofocus
          fluid
        />

        <small v-if="errors.name" class="auth-field__error">
          {{ errors.name }}
        </small>
      </div>
    </form>

    <template #footer>
      <Button
        @click="$emit('update:visible', false)"
        severity="secondary"
        label="Cancel"
        text
      />

      <Button
        @click="$emit('submit', localBoard)"
        type="submit"
        label="Create"
        :loading
      />
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import { ref, type PropType } from 'vue'
import type { Board } from '~/types/board'

const props = defineProps({
  visible: {
    type: Boolean as PropType<boolean>,
    required: true,
  },
  errors: {
    type: Object as PropType<Record<string, string>>,
    default: () => ({})
  },
  loading: {
    type: Boolean as PropType<boolean>,
    default: false
  }
})

const emit = defineEmits<{
  'update:visible': [value: boolean]
  'submit': [board: Board]
}>()

const localBoard = ref<Board>({ ...props.board })
</script>
