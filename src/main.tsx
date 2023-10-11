import '@fontsource/roboto'
import '@mantine/core/styles.css'
import './index.css'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const rootElement : HTMLElement | null= document.getElementById('root')

if (rootElement) {
  const queryClient = new QueryClient()

  createRoot(rootElement).render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </StrictMode>,
  )
}
