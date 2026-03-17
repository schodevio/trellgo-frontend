import { apiService } from '~/services/api'
import type { Board, CreateBoardPayload, UpdateBoardPayload } from '~/types/board'

export const boardsService = {
  getAll: (): Promise<Board[]> =>
    apiService.get<Board[]>('/boards'),

  getOne: (id: string): Promise<Board> =>
    apiService.get<Board>(`/boards/${id}`),

  create: (payload: CreateBoardPayload): Promise<Board> =>
    apiService.post<Board>('/boards', payload),

  update: (id: string, payload: UpdateBoardPayload): Promise<Board> =>
    apiService.put<Board>(`/boards/${id}`, payload),

  delete: (id: string): Promise<void> =>
    apiService.delete<void>(`/boards/${id}`),
}
