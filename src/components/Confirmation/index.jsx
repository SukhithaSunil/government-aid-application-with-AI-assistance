import {Box, Typography} from '@mui/material'
import {useTranslation} from 'react-i18next'

const Confirmation = () => {
  const {t} = useTranslation()
  return (
    <Box>
      <Typography variant="h5" gutterBottom className="text-center mb-4 mt-8">
        {t('applicationSubmitted')}
      </Typography>
      <Typography variant="subtitle1">
        {t('applicationNumberMessage')}
      </Typography>
      <Box className="flex items-center justify-center">
        <img
          height={'300px'}
          width={'300px'}
          src="public/success-tick.jpg"
          alt="User Avatar"
        />
      </Box>
    </Box>
  )
}

export default Confirmation
