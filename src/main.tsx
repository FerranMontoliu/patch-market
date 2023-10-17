import '@fontsource/roboto'
import '@mantine/core/styles.css'
import '@mantine/notifications/styles.css'
import './index.css'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { MantineProvider, MantineThemeOverride } from '@mantine/core'
import { Notifications } from '@mantine/notifications'
import App from './App.tsx'
import { UserContextProvider } from './contexts/UserContext.tsx'

const rootElement : HTMLElement | null= document.getElementById('root')

if (rootElement) {
  const queryClient = new QueryClient()

  const theme: MantineThemeOverride = {
    primaryColor: 'dark',
    black: '#1c1c1e',
    white: '#fbfbff',
  }

  createRoot(rootElement).render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <MantineProvider theme={theme}>
          <UserContextProvider>
            <BrowserRouter>
              <Notifications />
              <App />
            </BrowserRouter>
          </UserContextProvider>
        </MantineProvider>
      </QueryClientProvider>
    </StrictMode>,
  )
}


