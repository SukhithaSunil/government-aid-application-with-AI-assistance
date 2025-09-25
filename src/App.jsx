import React from 'react'
import './App.css'
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom'
import {CircularProgress} from '@mui/material'
import ErrorBoundary from './components/ErrorBoundary'
const UserCreationForm = React.lazy(() => import('./pages/UserCreationForm'))
const NotFound = React.lazy(() => import('./pages/NotFound'))

const App = () => {
  const fallback = (
    <div className="flex items-center justify-center h-screen">
      <CircularProgress />
    </div>
  )
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <React.Suspense fallback={fallback}>
          <Routes>
            <Route path="/" element={<Navigate to="/social-portal" />} />
            <Route path="/social-portal" element={<UserCreationForm />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </React.Suspense>
      </ErrorBoundary>
    </BrowserRouter>
  )
}

export default App
