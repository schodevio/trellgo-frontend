<template>
  <NuxtLayout name="app">
    <div class="boards-page">
      <div class="boards-page__header">
        <h1 class="boards-page__title">My Boards</h1>

        <Button
          @click="showCreate = true"
          label="New board"
          icon="ti ti-plus"
        />
      </div>

      <div
        v-if="boardsStore.loading"
        class="boards-page__loading"
      >
        <ProgressSpinner />
      </div>

      <div
        v-else-if="boardsStore.boards.length === 0"
        class="boards-page__empty"
      >
        <p class="boards-page__empty-text">No boards yet. Create your first one!</p>
      </div>

      <BoardsGrid
        v-else
        @open="navigateToBoard"
        @edit="openEdit"
        @delete="confirmDelete"
        :boards="boardsStore.boards"
      />

      <CreateBoardDialog
        v-model:visible="showCreate"
        @submit="handleCreate"
        :loading
        :errors
      />

      <UpdateBoardDialog
        v-if=boardToEdit
        v-model:visible="showEdit"
        @submit="handleUpdate"
        :board="boardToEdit"
        :loading
        :errors
      />

      <ConfirmDialog />
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useConfirm } from 'primevue/useconfirm'

import { useBoardsStore } from '~/stores/boards'
import type { Board } from '~/types/board'

definePageMeta({ layout: false })

const loading = ref(false)
const errors = ref<Record<string, string>>({})

// Fetch boards when the component is mounted
const boardsStore = useBoardsStore()
onMounted(() => boardsStore.fetchBoards())

// New board
const showCreate = ref(false)

const handleCreate = async (board: Board) => {
  loading.value = true
  errors.value = {}

  try {
    await boardsStore.createBoard({ name: board.name })
    showCreate.value = false
  } catch (err) {
    errors.value = err.details || {}
  } finally {
    loading.value = false
  }
}

// Edit board
const showEdit = ref(false)
const boardToEdit = ref<Board | null>(null)

const openEdit = (board: Board) => {
  boardToEdit.value = board
  showEdit.value = true
  loading.value = false
  errors.value = {}
}

const handleUpdate = async (board: Board) => {
  loading.value = true
  errors.value = {}

  try {
    await boardsStore.updateBoard(board.id, { name: board.name })
    boardToEdit.value = null
    showEdit.value = false
  } catch (err) {
    errors.value = err.details || {}
  } finally {
    loading.value = false
  }
}

// Show board
const navigateToBoard = (id: string) => navigateTo(`/boards/${id}`)

// Delete board
const confirm = useConfirm()

const confirmDelete = (board: Board) => {
  confirm.require({
    accept: () => boardsStore.deleteBoard(board.id),
    header: 'Delete board',
    message: `Delete "${board.name}"? This cannot be undone.`,
    icon: 'ti ti-exclamation-triangle',
    rejectProps: {
      label: 'Cancel',
      severity: 'secondary',
      text: true
    },
    acceptProps: {
      label: 'Delete',
      severity: 'danger'
    }
  })
}
</script>
