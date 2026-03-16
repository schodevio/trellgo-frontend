import { defineStore } from 'pinia'
import { ref } from 'vue'

import { boardsService } from '~/services/boards'
import type { Board, CreateBoardPayload, UpdateBoardPayload } from '~/types/board'

export const useBoardsStore = defineStore('boards', () => {
  const boards = ref<Board[]>([])
  const currentBoard = ref<Board | null>(null)
  const loading = ref(false)

  const fetchBoards = async () => {
    loading.value = true
    try {
      boards.value = await boardsService.getAll()
    } finally {
      loading.value = false
    }
  }

  const fetchBoard = async (id: string) => {
    loading.value = true
    try {
      currentBoard.value = await boardsService.getOne(id)
    } finally {
      loading.value = false
    }
  }

  const createBoard = async (payload: CreateBoardPayload): Promise<Board> => {
    const board = await boardsService.create(payload)
    boards.value.push(board)
    return board
  }

  const updateBoard = async (id: string, payload: UpdateBoardPayload): Promise<Board> => {
    const updated = await boardsService.update(id, payload)
    const index = boards.value.findIndex(b => b.id === id)
    if (index !== -1) boards.value[index] = updated
    if (currentBoard.value?.id === id) currentBoard.value = updated
    return updated
  }

  const deleteBoard = async (id: string) => {
    await boardsService.delete(id)
    boards.value = boards.value.filter(b => b.id !== id)
    if (currentBoard.value?.id === id) currentBoard.value = null
  }

  return {
    boards,
    currentBoard,
    loading,
    fetchBoards,
    fetchBoard,
    createBoard,
    updateBoard,
    deleteBoard,
  }
})
