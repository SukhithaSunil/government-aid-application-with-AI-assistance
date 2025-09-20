import React from 'react'
import './App.css'
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom'
import {CircularProgress} from '@mui/material'
import ErrorBoundary from './components/ErrorBoundary'
const Form = React.lazy(() => import('./features/Form'))
const NotFound = React.lazy(() => import('./features/NotFound'))
//lazy loading, error boundary
const fallback = (
  <div className="flex items-center justify-center h-screen">
    <CircularProgress />
  </div>
)

const App = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <React.Suspense fallback={fallback}>
          <Routes>
            <Route path="/" element={<Navigate to="/social-portal" />} />
            <Route path="/social-portal" element={<Form />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </React.Suspense>
      </ErrorBoundary>
    </BrowserRouter>
  )
}

export default App
