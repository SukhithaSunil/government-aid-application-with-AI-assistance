import {
  Box,
  Stack,
  Step,
  Switch,
  Button,
  Typography,
  Paper,
} from '@mui/material'
import {useState} from 'react'
import {useTranslation} from 'react-i18next'
import '../../config/i18n'
import {LANGUAGES, LANGUAGE_TO_DIRECTION} from '../../util/constants'
import {useSelector, useDispatch} from 'react-redux'
import {toggleLanguage} from '../../store/languageSlice'

const LanguageSwitch = () => {
  const {currentLanguage} = useSelector((state) => state.language)
  const [selectedLanguage, setSelectedLanguage] = useState(currentLanguage)
  const {t, i18n} = useTranslation()
  const dispatch = useDispatch()

  const handleChange = () => {
    const lang = selectedLanguage === LANGUAGES.EN ? LANGUAGES.AR : LANGUAGES.EN
    setSelectedLanguage(lang)
    dispatch(toggleLanguage())
    i18n.changeLanguage(lang)
    document.documentElement.setAttribute('lang', lang)
    document.documentElement.setAttribute('dir', LANGUAGE_TO_DIRECTION[lang])
  }
  return (
    <Stack direction="row" spacing={1} className="flex items-center mb-4">
      <Typography>{t('arabic')}</Typography>
      <Switch
        checked={selectedLanguage == LANGUAGES.AR}
        onChange={handleChange}
        slotProps={{input: {'aria-label': 'controlled'}}}
      />
      <Typography>{t('english')}</Typography>
    </Stack>
  )
}

export default LanguageSwitch
