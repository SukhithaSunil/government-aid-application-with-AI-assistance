import {createSlice} from '@reduxjs/toolkit'
import {LANGUAGES} from '../util/constants'

const initialState = {
  currentLanguage: LANGUAGES.EN,
}

const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    toggleLanguage: (state, action) => {
      state.currentLanguage = action.payload
    },
  },
})

export const {toggleLanguage} = languageSlice.actions
export default languageSlice.reducer
