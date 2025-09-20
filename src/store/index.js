import {configureStore} from '@reduxjs/toolkit'
import formSlice from './formSlice'
import languageSlice from './languageSlice.js'
import {readState} from '../util'
import generateSuggestionSlice from './generateSuggestionSlice.js'
import {autoSaveMiddleware} from './autoSaveMiddleware.js'

const formState = readState()
console.log(formState)
export const store = configureStore({
  reducer: {
    form: formSlice,
    language: languageSlice,
    generateSuggestion: generateSuggestionSlice,
  },
  preloadedState: {form: formState},
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(autoSaveMiddleware),
})
