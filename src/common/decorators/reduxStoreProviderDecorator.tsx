import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import { combineReducers } from 'redux'
import { v1 } from 'uuid'

import { usersSlice } from '../../app/model/slice.ts'
import { AppRootType } from '../../app/model/store.ts'

const rootReducer = combineReducers({
  users: usersSlice,
})

const initialGlobalState: AppRootType = {
  users: [
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
  ],
}

export const storyBookStore = configureStore({
  reducer: rootReducer,
  preloadedState: initialGlobalState,
})

export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => {
  return <Provider store={storyBookStore}>{storyFn()}</Provider>
}
