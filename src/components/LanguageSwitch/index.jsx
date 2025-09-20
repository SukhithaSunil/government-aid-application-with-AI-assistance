import LanguageIcon from '@mui/icons-material/Language'
import {Button, Menu, MenuItem} from '@mui/material'
import {useState} from 'react'
import {useTranslation} from 'react-i18next'
import {useDispatch, useSelector} from 'react-redux'
import '../../config/i18n'
import {toggleLanguage} from '../../store/languageSlice'
import {LANGUAGES, LANGUAGE_TO_DIRECTION} from '../../util/constants'

const LanguageSwitch = () => {
  const {currentLanguage} = useSelector((state) => state.language)
  const dispatch = useDispatch()
  const {i18n, t} = useTranslation()
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleLanguageChange = (lang) => {
    if (lang !== currentLanguage) {
      dispatch(toggleLanguage(lang))
      i18n.changeLanguage(lang)
      document.documentElement.setAttribute('lang', lang)
      document.documentElement.setAttribute('dir', LANGUAGE_TO_DIRECTION[lang])
    }
    handleClose()
  }

  return (
    <>
      <Button
        aria-controls={open ? 'language-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        className="mb-8"
        color="success"
        startIcon={<LanguageIcon />}
        variant="outlined">
        {t(currentLanguage)}
      </Button>
      <Menu
        id="language-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}>
        {Object.values(LANGUAGES).map((lang) => (
          <MenuItem
            key={lang}
            selected={currentLanguage === lang}
            onClick={() => handleLanguageChange(lang)}>
            {t(lang)}
          </MenuItem>
        ))}
      </Menu>
    </>
  )
}

export default LanguageSwitch
