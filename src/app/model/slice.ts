import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { v1 } from 'uuid'

export type Person = {
  id: string
  name: string
}

export type Board = {
  id: string
  title: string
  items: Person[]
}
type Boards = Board[]

const slice = createSlice({
  name: 'users',
  initialState: [
    {
      id: v1(),
      title: 'users',
      items: [
        {
          id: v1(),
          name: 'Valera',
        },
        {
          id: v1(),
          name: 'Serega',
        },
      ],
    },
    {
      id: v1(),
      title: 'mentors',
      items: [
        {
          id: v1(),
          name: 'Dimych',
        },
        {
          id: v1(),
          name: 'Sveta',
        },
      ],
    },
  ] as Boards,
  reducers: {
    dragPersonToBoard: (
      state,
      action: PayloadAction<{
        currentBoardId: string
        targetBoardId: string
        currentItemId: string
        targetItemId: string
      }>
    ) => {
      const { currentBoardId, targetBoardId, currentItemId, targetItemId } = action.payload

      const currentBoard = state.find(board => board.id === currentBoardId)
      const targetBoard = state.find(board => board.id === targetBoardId)

      if (currentBoard && targetBoard) {
        const currentItemIndex = currentBoard.items.findIndex(item => item.id === currentItemId)
        const targetItemIndex = targetBoard.items.findIndex(item => item.id === targetItemId)

        if (currentItemIndex > -1 && targetItemIndex > -1) {
          const [removed] = currentBoard.items.splice(currentItemIndex, 1)

          targetBoard.items.splice(targetItemIndex + 1, 0, removed)
        }
      }
    },
    dropPersonOnBoard: (
      state,
      action: PayloadAction<{
        currentBoardId: string
        currentItemId: string
        targetBoardId: string
      }>
    ) => {
      const { currentBoardId, currentItemId, targetBoardId } = action.payload

      const currentBoard = state.find(board => board.id === currentBoardId)
      const targetBoard = state.find(board => board.id === targetBoardId)

      if (currentBoard && targetBoard) {
        const currentItemIndex = currentBoard.items.findIndex(item => item.id === currentItemId)

        if (currentItemIndex > -1) {
          const [removed] = currentBoard.items.splice(currentItemIndex, 1)

          targetBoard.items.push(removed)
        }
      }
    },
  },
})

export const usersSlice = slice.reducer
export const usersActions = slice.actions
