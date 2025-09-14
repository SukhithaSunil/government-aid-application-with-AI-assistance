import CssBaseline from '@mui/material/CssBaseline'
import { useSelector } from 'react-redux'
import './App.css'
import { RTLProvider } from './config/RTL.jsx'
import Form from './features/Form'
import { DIRECTION, LANGUAGE_TO_DIRECTION } from './util/constants.js'

const App = () => {
  const {currentLanguage} = useSelector((state) => state.language)

  return LANGUAGE_TO_DIRECTION[currentLanguage] === DIRECTION.RTL ? (
    <RTLProvider>
      <CssBaseline />
      <Form />
    </RTLProvider>
  ) : (
    <>
      {' '}
      <CssBaseline />
      <Form />
    </>
  )
}

export default App
