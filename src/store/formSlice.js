import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import {saveState, delay} from '../util/index.js'
const API_URL = 'http://localhost:3001/users'
import axiosInstance from '../network/axiosInstance'

export const createUserProfile = createAsyncThunk(
  'form/createUserProfile',
  async (postData, {rejectWithValue}) => {
    try {
      await delay(3000) // simulate a delay
      const response = await axiosInstance.post(API_URL, [postData])
      return response.data
    } catch (err) {
      return rejectWithValue(err.message || 'Something went wrong. Try again')
    }
  }
)
const formSlice = createSlice({
  name: 'form',
  initialState: {
    currentStep: 1,
    formState: {
      name: '',
      nationalId: '',
      dateOfBirth: '',
      phone: '',
      address: '',
      city: '',
      state: '',
      country: '',
      gender: 'male',
      mail: '',
      maritalStatus: '',
      dependents: '',
      employmentStatus: '',
      monthlyIncome: '',
      housingStatus: '',
      currentFinancialSituation: '',
      employmentCircumstances: '',
      reasonForApplying: '',
    },
    completedStep: 0,
    error: '',
    loading: false,
  },
  reducers: {
    next(state, action) {
      Object.assign(state.formState, action.payload)
      state.completedStep = state.currentStep
      state.currentStep += 1
      saveState(state)
    },
    goBack(state) {
      state.currentStep -= 1
    },
    clearFormError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUserProfile.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(createUserProfile.fulfilled, (state, action) => {
        state.loading = false
        Object.assign(state.formState, action.payload[0])
        state.currentStep += 1
        saveState(state)
      })
      .addCase(createUserProfile.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export const {next, goBack, clearFormError} = formSlice.actions
export default formSlice.reducer
