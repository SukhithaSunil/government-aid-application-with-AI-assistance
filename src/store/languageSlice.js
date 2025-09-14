import {createSlice} from '@reduxjs/toolkit'
import {LANGUAGES} from '../util/constants'

const initialState = {
  currentLanguage: LANGUAGES.EN,
}

const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    toggleLanguage: (state) => {
      state.currentLanguage = state.currentLanguage === LANGUAGES.EN ? LANGUAGES.AR : LANGUAGES.EN
    },
  },
})

export const {toggleLanguage} = languageSlice.actions
export default languageSlice.reducer
