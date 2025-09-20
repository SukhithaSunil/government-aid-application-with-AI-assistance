import {tryCatchWrapper} from '../util'
import {fetchFailure, next} from './formSlice'

export const autoSaveMiddleware = (store) => (nextMiddleware) => (action) => {
  const result = nextMiddleware(action)

  if (next.match(action)) {
    tryCatchWrapper(
      () => {
        const state = store.getState().form
        const serializedState = JSON.stringify(state)
        localStorage.setItem('formState', serializedState)
      },
      (error) => {
        console.warn('Auto-save failed:', error)
        store.dispatch(fetchFailure('Auto-save failed'))
      }
    )
  }

  return result
}
