import {useState, useEffect} from 'react'
import {
  Box,
  Button,
  Typography,
  Modal,
  IconButton,
  TextField,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import {useTranslation} from 'react-i18next'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
}

export const Suggestions = ({
  togglePopup,
  open,
  title,
  description,
  onAccept,
}) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editedText, setEditedText] = useState(description)
  const {t} = useTranslation()

  useEffect(() => {
    setEditedText(description)
    setIsEditing(false)
  }, [description])

  const setEditingMode = () => setIsEditing(true)
  const onClose = () => {
    setIsEditing(false)
    togglePopup()
  }
  const handleAccept = () => {
    onAccept(editedText || description)
  }
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="suggestions-modal-title"
      aria-describedby="suggestions-modal-description">
      <Box sx={{...style, position: 'relative'}}>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            color: (theme) => theme.palette.grey[500],
          }}>
          <CloseIcon />
        </IconButton>
        <Typography id="suggestions-modal-title" variant="h5" component="h2">
          {title}
        </Typography>
        {!isEditing ? (
          <Typography id="suggestions-modal-description" sx={{mt: 2}}>
            {description}
          </Typography>
        ) : (
          <TextField
            sx={{mt: 4}}
            id="suggestions-modal-description"
            value={editedText}
            fullWidth
            multiline
            minRows={5}
            onChange={(e) => setEditedText(e.target.value)}
          />
        )}

        <Box sx={{display: 'flex', justifyContent: 'flex-end', gap: 1, mt: 4}}>
          <Button
            variant="outlined"
            onClick={setEditingMode}
            sx={{width: '85px'}}>
            {t('labels.edit')}
          </Button>
          <Button
            variant="contained"
            onClick={handleAccept}
            sx={{width: '85px'}}>
            {t('labels.accept')}
          </Button>
        </Box>
      </Box>
    </Modal>
  )
}
