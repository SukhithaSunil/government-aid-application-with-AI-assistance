import './App.css'
import Form from './features/Form'
import NotFound from './features/NotFound'
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'

const App = () => {
  return (
    <BrowserRouter basename="/community-aid-finance-portal">
      <Routes>
        <Route path="/" element={<Navigate to="/social-portal" />} />
        <Route path="/social-portal" element={<Form />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
