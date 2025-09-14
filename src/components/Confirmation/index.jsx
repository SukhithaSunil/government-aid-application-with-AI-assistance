import { Box, Typography } from '@mui/material'

const Confirmation = () => {
  return (
       <Box>
      <Typography variant="h5" gutterBottom className="text-center mb-4 mt-8">
        Application submitted
      </Typography>
      <Typography variant="subtitle1">
        Your application number is #2001539. We have emailed your confirmation. If you ever need support, please feel free to email us at support@aid.com.
      </Typography>
    </Box>
  )
}

export default Confirmation
