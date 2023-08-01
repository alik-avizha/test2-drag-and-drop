import './index.css'
import { StrictMode } from 'react'

import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'

import { store } from './app/model/store.ts'
import App from './app/ui/app.tsx'

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
)
