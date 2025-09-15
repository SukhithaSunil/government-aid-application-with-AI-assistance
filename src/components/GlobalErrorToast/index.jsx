import Snackbar from '@mui/material/Snackbar'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import {useEffect, useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {clearAIError} from '../../store/generateSuggestionSlice'
import {clearFormError} from '../../store/formSlice'
import {useTranslation} from 'react-i18next'
import React from 'react'

const GlobalErrorToast = () => {
  const dispatch = useDispatch()
  const {t} = useTranslation()
  const suggestionError = useSelector((state) => state.generateSuggestion.error)
  const formSubmissionError = useSelector((state) => state.form.error)

  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (suggestionError) {
      setMessage(t('failedToFetchSuggestion') || suggestionError)
      setOpen(true)
      dispatch(clearAIError())
    }
  }, [dispatch, suggestionError, t])

  useEffect(() => {
    if (formSubmissionError) {
      setMessage(`${formSubmissionError}. Please try again`)
      setOpen(true)
      dispatch(clearFormError())
    }
  }, [dispatch, formSubmissionError])

  const handleClose = () => {
    setOpen(false)
  }
  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}>
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  )
  return (
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        message={message}
        data-testid={'alert'}
        action={action}
        anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
        role="alert"
        aria-live="assertive"
      />
  )
}

export default GlobalErrorToast
