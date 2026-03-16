<template>
  <NuxtLayout name="app">
    <div class="boards-page">
      <div class="boards-page__header">
        <h1 class="boards-page__title">My Boards</h1>
        <Button label="New board" icon="pi pi-plus" @click="showCreate = true" />
      </div>

      <div v-if="boardsStore.loading" class="boards-page__loading">
        <ProgressSpinner />
      </div>

      <div v-else-if="boardsStore.boards.length === 0" class="boards-page__empty">
        <p class="boards-page__empty-text">No boards yet. Create your first one!</p>
      </div>

      <BoardsGrid
        v-else
        :boards="boardsStore.boards"
        @open="navigateToBoard"
        @edit="openEdit"
        @delete="confirmDelete"
      />

      <CreateBoardDialog
        v-model:visible="showCreate"
        @created="handleCreate"
      />

      <UpdateBoardDialog
        v-model:visible="showEdit"
        :board="boardToEdit"
        @updated="handleUpdate"
      />

      <ConfirmDialog />
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { useConfirm } from 'primevue/useconfirm'
import { ref, onMounted } from 'vue'

import { useBoardsStore } from '~/stores/boards'
import type { Board } from '~/types/board'

definePageMeta({ layout: false })

const boardsStore = useBoardsStore()
const confirm = useConfirm()

const showCreate = ref(false)
const showEdit = ref(false)
const boardToEdit = ref<Board | null>(null)

onMounted(() => boardsStore.fetchBoards())

const navigateToBoard = (id: string) => navigateTo(`/boards/${id}`)

const openEdit = (board: Board) => {
  boardToEdit.value = board
  showEdit.value = true
}

const handleCreate = async (name: string) => {
  await boardsStore.createBoard({ name })
}

const handleUpdate = async (name: string) => {
  if (!boardToEdit.value) return
  await boardsStore.updateBoard(boardToEdit.value.id, { name })
}

const confirmDelete = (board: Board) => {
  confirm.require({
    message: `Delete "${board.name}"? This cannot be undone.`,
    header: 'Delete board',
    icon: 'pi pi-exclamation-triangle',
    rejectProps: { label: 'Cancel', severity: 'secondary', text: true },
    acceptProps: { label: 'Delete', severity: 'danger' },
    accept: () => boardsStore.deleteBoard(board.id),
  })
}
</script>
