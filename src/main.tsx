import '@fontsource/roboto'
import '@mantine/core/styles.css'
import './index.css'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { MantineProvider, MantineThemeOverride } from '@mantine/core'
import App from './App.tsx'

const rootElement : HTMLElement | null= document.getElementById('root')

if (rootElement) {
  const queryClient = new QueryClient()

  const theme: MantineThemeOverride = {
    primaryColor: '#1c1c1e',
    black: '#1c1c1e',
    white: '#fbfbff',
  }

  createRoot(rootElement).render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <MantineProvider theme={theme}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </MantineProvider>
      </QueryClientProvider>
    </StrictMode>,
  )
}
