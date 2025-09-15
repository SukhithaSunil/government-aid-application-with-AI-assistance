import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import languageSlice from '../store/languageSlice.js'
import generateSuggestionSlice from '../store/generateSuggestionSlice.js'
import formSlice from '../store/formSlice'

const createTestStore = (preloadedState = {}) =>
  configureStore({
    reducer: {  form: formSlice,
    language: languageSlice,
    generateSuggestion: generateSuggestionSlice},
    preloadedState,
  })

const customRender = (ui, { preloadedState = {}, ...options } = {}) => {
  const store = createTestStore(preloadedState)
  return render(<Provider store={store}>{ui}</Provider>, options)
}

export * from '@testing-library/react'
export { customRender as render }

