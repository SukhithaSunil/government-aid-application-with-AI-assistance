import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'
import {Button, Grid, Snackbar} from '@mui/material'
import {useEffect, useState} from 'react'
import {useFormContext} from 'react-hook-form'
import {Suggestions} from '../Assistant/suggestions'
import ControlledTextField from '../Form/ControlledTextField'
import {useAISuggestion} from '../../hook/useAISuggestion'

const SituationDetails = () => {
  const {
    control,
    formState: {errors},
    resetField,
  } = useFormContext()
  const getTextFieldProps = (name) => ({
    name,
    label: `${name}`,
    ariaLabel: name,
    control,
    error: errors[name],
  })
  const [open, setOpen] = useState(false)
  const togglePopup = () => setOpen((prev) => !prev)
  const [showError, setShowError] = useState(false)

  const handleClose = (_, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setOpen(false)
  }

  const {fetchSuggestion, suggestion, loading, error} = useAISuggestion()
  const [editedSuggestions, setEditedSuggestions] = useState({})
  const [selectedField, setSelectedField] = useState('')

  const handleSuggestion = async (field) => {
    setSelectedField(field)
    fetchSuggestion(field)
  }

  const onAccept = (text) => {
    setEditedSuggestions({...editedSuggestions, [selectedField]: text})
    resetField(selectedField, {
      defaultValue: text,
    })
    togglePopup()
  }

  useEffect(() => {
    if (error) setShowError(true)
    console.log({suggestion})
    if (suggestion) togglePopup()
  }, [error, suggestion, loading])
  const queries = [
    'currentFinancialSituation',
    'employmentCircumstances',
    'reasonForApplying',
  ]
  return (
    <Grid container>
      {queries.map((item) => (
        <Grid item size={{xs: 12}} sx={{m: 1, minWidth: 100}}>
          <ControlledTextField {...getTextFieldProps(item)} isMultiLine />
          <Button
            onClick={() => handleSuggestion(item)}
            disabled={loading}
            startIcon={<AutoAwesomeIcon />}>
            {loading ? 'Generating...' : 'Help Me Write'}
          </Button>
        </Grid>
      ))}
      <Suggestions
        togglePopup={togglePopup}
        open={open}
        title={'Suggestion'}
        description={suggestion}
        onAccept={onAccept}
      />
      <Snackbar
        open={showError}
        autoHideDuration={4000}
        anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
        onClose={handleClose}
        message={error}
      />
    </Grid>
  )
}

export default SituationDetails
