import {Box, Typography} from '@mui/material'
import React from 'react'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = {hasError: false}
  }

  static getDerivedStateFromError() {
    return {hasError: true}
  }

  componentDidCatch(error, errorInfo) {
    console.error('error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <Box className="flex flex-col px-4 items-center justify-center min-h-[80vh] text-center">
          <Typography variant="h3" gutterBottom>
            Oops, something went wrong.
          </Typography>
        </Box>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
