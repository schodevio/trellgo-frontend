export type Board = {
  id: string
  name: string
  created_at: string
  updated_at: string
}

export type CreateBoardPayload = {
  name: string
}

export type UpdateBoardPayload = {
  name: string
}
