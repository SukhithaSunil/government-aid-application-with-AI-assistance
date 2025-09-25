import {createSlice} from '@reduxjs/toolkit'

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
      state.completedStep = Math.max(state.completedStep, state.currentStep)
      state.currentStep += 1
    },
    goBack(state) {
      state.currentStep -= 1
    },
    clearFormError: (state) => {
      state.error = null
    },
    fetchLoading: (state) => {
      state.loading = true
      state.error = null
    },
    fetchSuccess: (state) => {
      state.loading = false
      state.currentStep += 1
    },
    fetchFailure: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
  },
})

export const {
  next,
  goBack,
  clearFormError,
  fetchFailure,
  fetchLoading,
  fetchSuccess,
} = formSlice.actions
export default formSlice.reducer
