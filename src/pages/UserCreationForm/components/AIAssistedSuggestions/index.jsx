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
import {useFormContext} from 'react-hook-form'
import {modalStyle, closeButtonStyle, buttonGroupStyle} from './styles'
import PropTypes from 'prop-types'

export const Suggestions = ({
  togglePopup,
  open,
  title,
  description,
  onAccept,
  activeField,
}) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editedText, setEditedText] = useState(description)
  const {t} = useTranslation()
  const {setValue} = useFormContext()
  useEffect(() => {
    setEditedText(description)
    setIsEditing(false)
  }, [description])

  const setEditingMode = () => setIsEditing(true)
  const onClose = () => {
    setValue(activeField, '', {
      shouldDirty: true,
      shouldTouch: true,
    })
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
      aria-describedby="suggestions-modal-description"
      role="dialog"
      aria-modal="true">
      <Box sx={modalStyle} role="document">
        <IconButton aria-label="Close" onClick={onClose} sx={closeButtonStyle}>
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
            className="mt-8"
            id="suggestions-modal-description"
            value={editedText}
            fullWidth
            multiline
            minRows={5}
            onChange={(e) => setEditedText(e.target.value)}
          />
        )}
        <Box sx={buttonGroupStyle}>
          <Button
            variant="outlined"
            onClick={setEditingMode}
            className="w-[85px]"
            aria-label="Edit suggestion">
            {t('labels.edit')}
          </Button>
          <Button
            variant="contained"
            onClick={handleAccept}
            className="w-[85px]"
            aria-label="Accept suggestion">
            {t('labels.accept')}
          </Button>
        </Box>
      </Box>
    </Modal>
  )
}

Suggestions.propTypes = {
  togglePopup: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  onAccept: PropTypes.func.isRequired,
  activeField: PropTypes.string.isRequired,
}
