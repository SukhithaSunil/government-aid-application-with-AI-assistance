import {createSlice} from '@reduxjs/toolkit'
import {saveState} from '../util/index.js'

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
    completedStep: 0
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
})

export const {next, goBack} = formSlice.actions
export default formSlice.reducer
