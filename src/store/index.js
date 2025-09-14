import {configureStore} from '@reduxjs/toolkit'
import formSlice from './formSlice'
import {readState} from '../util/index.js'

const formState = readState()
export const store = configureStore({
  reducer: {
    form: formSlice,
  },
  preloadedState: {form: formState},
})
