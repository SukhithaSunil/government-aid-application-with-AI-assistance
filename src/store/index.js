import {configureStore} from '@reduxjs/toolkit'
import formSlice from './formSlice'
import languageSlice from './languageSlice.js'
import {readState} from '../util/index.js'
import generateSuggestionSlice from './generateSuggestionSlice.js'

const formState = readState()
export const store = configureStore({
  reducer: {
    form: formSlice,
    language: languageSlice,
    generateSuggestion: generateSuggestionSlice
  },
  preloadedState: {form: formState},
})
