import {configureStore} from '@reduxjs/toolkit'
import formSlice from './formSlice'
import languageSlice from './languageSlice.js'
import {readState} from '../util/index.js'

const formState = readState()
export const store = configureStore({
  reducer: {
    form: formSlice,
    language: languageSlice
  },
  preloadedState: {form: formState},
})
