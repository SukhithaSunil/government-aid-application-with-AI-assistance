import createCache from '@emotion/cache'
import { CacheProvider } from '@emotion/react'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App.jsx'
import './index.css'
import { store } from './store/index.js'

const cache = createCache({
  key: 'css',
  prepend: true,
})

const theme = createTheme({
  direction: 'ltr',
  palette: {
    mode: 'light',
    primary: {
      main: '#0A192F', // Deep Navy Blue
      light: '#112D4E',
      dark: '#000B1E',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#00B8A9', // Teal
      light: '#33C9BA',
      dark: '#008B7C',
      contrastText: '#ffffff',
    },
    background: {
      default: '#F4F6F8', // Light Gray
      paper: '#FFFFFF', // White cards
    },
    text: {
      primary: '#1F2937', // Dark Gray (good for headings)
      secondary: '#4B5563', // Medium Gray (for subtext)
    },
    error: {
      main: '#D32F2F', // Material Red
    },
    warning: {
      main: '#F57C00', // Orange
    },
    info: {
      main: '#0288D1', // Blue
    },
    success: {
      main: '#2E7D32', // Green
    },
  },
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CacheProvider value={cache}>
      <ThemeProvider theme={theme}>
         <Provider store={store}><App /></Provider>
        
      </ThemeProvider>
    </CacheProvider>
  </StrictMode>
)
