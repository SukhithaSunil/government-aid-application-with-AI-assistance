import {ThemeProvider} from '@mui/material/styles'
import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {Provider} from 'react-redux'
import App from './App.jsx'
import {MuiTheme} from './config/MuiTheme.js'
import {RTLProvider} from './config/RTL.jsx'
import './index.css'
import {store} from './store'
import {CssBaseline} from '@mui/material'

const theme = MuiTheme()
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <RTLProvider>
          <CssBaseline />
          <App />
        </RTLProvider>
      </Provider>
    </ThemeProvider>
  </StrictMode>
)
