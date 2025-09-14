import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import {saveState} from '../util/index.js'
const API_URL = 'http://localhost:3001/users'
import axios from 'axios'

export const createUserProfile = createAsyncThunk(
  'form/createUserProfile',
  async (postData, {rejectWithValue}) => {
    try {
      const response = await axios.post(API_URL, [postData])
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
    status: '',
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUserProfile.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(createUserProfile.fulfilled, (state, action) => {
        state.status = 'succeeded'
        console.log(action.payload[0])
        Object.assign(state.formState, action.payload[0])
        state.currentStep += 1
        saveState(state)
      })
      .addCase(createUserProfile.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })
  },
})

export const {next, goBack} = formSlice.actions
export default formSlice.reducer
