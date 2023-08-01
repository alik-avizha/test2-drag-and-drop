import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'

import { usersSlice } from './slice.ts'

const rootReducer = combineReducers({
  users: usersSlice,
})

export const store = configureStore({
  reducer: rootReducer,
})

export type AppRootType = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store
