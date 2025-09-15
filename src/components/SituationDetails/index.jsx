import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'
import {Button, Grid} from '@mui/material'
import {useEffect, useState} from 'react'
import {useFormContext} from 'react-hook-form'
import {useTranslation} from 'react-i18next'
import {useDispatch, useSelector} from 'react-redux'
import {generateSuggestion} from '../../store/generateSuggestionSlice'
import {getCommonProps} from '../../util/index'
import {Suggestions} from '../Assistant/suggestions'
import ControlledTextField from '../Form/ControlledTextField'

const SituationDetails = () => {
  const {
    data: suggestion,
    loading,
    error,
  } = useSelector((state) => state.generateSuggestion)
  const dispatch = useDispatch()
  const {
    control,
    formState: {errors},
    resetField,
  } = useFormContext()
  const {t} = useTranslation()
  const getTextFieldProps = (name) => ({
    ...getCommonProps(name, `${t(name)}`),
    control,
    error: errors[name],
  })
  const [open, setOpen] = useState(false)
  const togglePopup = () => setOpen((prev) => !prev)

  const [editedSuggestions, setEditedSuggestions] = useState({})
  const [selectedField, setSelectedField] = useState('')

  const handleSuggestion = async (field) => {
    setSelectedField(field)
    dispatch(generateSuggestion(field))
  }

  const onAccept = (text) => {
    setEditedSuggestions({...editedSuggestions, [selectedField]: text})
    resetField(selectedField, {
      defaultValue: text,
    })
    togglePopup()
  }

  useEffect(() => {
    if (suggestion) togglePopup()
  }, [error, suggestion])

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
            {loading ? t('labels.generating') : t('labels.helpme')}
          </Button>
        </Grid>
      ))}
      <Suggestions
        togglePopup={togglePopup}
        open={open}
        title={t('labels.suggestion')}
        description={suggestion}
        onAccept={onAccept}
      />
    </Grid>
  )
}

export default SituationDetails
