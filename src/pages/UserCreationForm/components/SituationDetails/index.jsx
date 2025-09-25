import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'
import {Button, Grid, Typography} from '@mui/material'
import {useEffect, useState} from 'react'
import {useFormContext} from 'react-hook-form'
import {useTranslation} from 'react-i18next'
import {useDispatch, useSelector} from 'react-redux'
import ControlledTextField from '../../../../components/Form/ControlledTextField'
import {
  AI_ASSISTANCE_API_URL,
  HTTP_METHODS,
  OPENAI_CONFIG,
} from '../../../../util/constants'
import useFetch from '../../../../hook/useFetch'
import {
  fetchFailure,
  fetchLoading,
  fetchSuccess,
} from '../../../../store/generateSuggestionSlice'
import {Suggestions} from '../AIAssistedSuggestions'
import { getCommonProps } from '../../../../util'

const SituationDetails = () => {
  const {
    data: suggestion,
    loading,
    error,
  } = useSelector((state) => state.generateSuggestion)
  const {currentLanguage} = useSelector((state) => state.language)
  const dispatch = useDispatch()
  const {
    control,
    formState: {errors},
    setValue,
  } = useFormContext()
  const {t} = useTranslation()
  const {execute} = useFetch(
    AI_ASSISTANCE_API_URL,
    HTTP_METHODS.POST,
    () => dispatch(fetchLoading()),
    (data) => dispatch(fetchSuccess(data)),
    (err) => dispatch(fetchFailure(err.message)),
    true
  )
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
    setValue(field, t('labels.generating'), {
      shouldDirty: true,
      shouldTouch: true,
    })
    execute({
      model: OPENAI_CONFIG.MODEL,
      messages: [
        OPENAI_CONFIG.SYSTEM_MESSAGE,
        {
          role: OPENAI_CONFIG.ROLE,
          content: `I am filling out a government financial assistance form and need help writing about my financial hardship. Can you write a professional statement for the ${t(field)} section in minimum ${OPENAI_CONFIG.MESSAGE_LIMITS.MIN_WORDS} words and maximum ${OPENAI_CONFIG.MESSAGE_LIMITS.MAX_WORDS} words in ${t(currentLanguage)}?`,
        },
      ],
    })
  }

  const onAccept = (text) => {
    setEditedSuggestions({...editedSuggestions, [selectedField]: text})
    setValue(selectedField, text, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
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
      <Grid size={{xs: 12}}>
        <Typography variant="h5" gutterBottom className="text-center mb-5">
          {t('title3')}
        </Typography>
      </Grid>
      {queries.map((item) => (
        <Grid size={{xs: 12}} key={item}>
          <Button
            className="mb-1.5"
            onClick={() => handleSuggestion(item)}
            disabled={loading}
            color="secondary"
            startIcon={<AutoAwesomeIcon />}
            aria-busy={loading ? 'true' : 'false'}
            aria-live="polite">
            {t('labels.helpme')}
          </Button>
          <ControlledTextField {...getTextFieldProps(item)} isMultiLine />
        </Grid>
      ))}
      <Suggestions
        togglePopup={togglePopup}
        open={open}
        title={t('labels.suggestion')}
        description={suggestion}
        onAccept={onAccept}
        activeField={selectedField}
      />
    </Grid>
  )
}

export default SituationDetails
