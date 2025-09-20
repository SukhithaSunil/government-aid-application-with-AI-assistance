import i18n from 'i18next'
import {initReactI18next} from 'react-i18next'
import enTranslation from './locales/en/translation.json'
import arTranslation from './locales/ar/translation.json'
import {LANGUAGES} from '../util/constants'
i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: enTranslation,
    },
    ar: {
      translation: arTranslation,
    },
  },
  lng: LANGUAGES.EN,
  fallbackLng: LANGUAGES.EN,
  interpolation: {
    escapeValue: false,
  },
})

export default i18n
