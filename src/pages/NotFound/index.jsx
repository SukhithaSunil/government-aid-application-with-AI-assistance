import {Box, Typography, Button} from '@mui/material'
import {Link as RouterLink} from 'react-router-dom'

const NotFound = () => {
  return (
    <Box className="flex flex-col px-4 items-center justify-center min-h-[80vh] text-center">
      <Typography variant="h3" gutterBottom>
        Oops, this page doesn't exist.
      </Typography>
      <Typography variant="body1" mb={4}>
        The page you're looking for may have been moved or deleted.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        component={RouterLink}
        to="/social-portal">
        Go to Social Portal
      </Button>
    </Box>
  )
}

export default NotFound
