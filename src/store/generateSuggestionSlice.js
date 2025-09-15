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
            content: `Help me write the ${fieldName}" field. I am unemployed with no income. Help me describe my financial hardship.'}`,
          },
        ],
      })
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
