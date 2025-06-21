import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter as Router } from 'react-router'
import { SidebarProvider } from './components/ui/sidebar.tsx'
import { ThemeProvider } from './components/theme-provider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SidebarProvider defaultOpen>
      <Router>
        <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
          <App />
        </ThemeProvider>
      </Router>
    </SidebarProvider>
  </StrictMode>,
)
