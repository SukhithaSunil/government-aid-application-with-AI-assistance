import {createSlice} from '@reduxjs/toolkit'

const generateSuggestionSlice = createSlice({
  name: 'generateSuggestion',
  initialState: {
    loading: false,
    data: null,
    error: null,
  },
  reducers: {
    clearAIError: (state) => {
      state.error = null
    },
    fetchLoading: (state) => {
      state.loading = true
      state.error = null
    },
    fetchSuccess: (state, action) => {
      state.loading = false
      state.data = action.payload.choices[0].message.content
    },
    fetchFailure: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
  },
})

export const {clearAIError, fetchLoading, fetchFailure, fetchSuccess} =
  generateSuggestionSlice.actions
export default generateSuggestionSlice.reducer
