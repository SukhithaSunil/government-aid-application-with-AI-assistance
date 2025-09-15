import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axiosInstance from '../network/axiosInstance'

export const generateSuggestion = createAsyncThunk(
  'generateSuggestion',
  async (fieldName, {rejectWithValue}) => {
    try {
      const response = await axiosInstance.post('/chat/completions', {
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content:
              'You are helping a user write about their financial hardship for a form.',
          },
          {
            role: 'user',
            content: `I am filling out a government financial assistance form and need help writing about my financial hardship. Can you write a professional statement for the ${fieldName} section in minimum 30 words and maximum 50 words?`,
          },
        ],
      }, { needsAuth: true })
      return response.data.choices[0].message.content
    } catch (error) {
      return rejectWithValue(error.customMessage)
    }
  }
)

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
  },
  extraReducers: (builder) => {
    builder
      .addCase(generateSuggestion.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(generateSuggestion.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
      })
      .addCase(generateSuggestion.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export const {clearAIError} = generateSuggestionSlice.actions
export default generateSuggestionSlice.reducer
