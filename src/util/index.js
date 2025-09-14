export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state)
    localStorage.setItem('formState', serializedState)
  } catch (e) {
    console.warn('Failed to save state to localStorage:', e)
  }
}
export const readState = () => {
  try {
    const serializedState = localStorage.getItem('formState')
    if (serializedState === null) {
      return undefined
    }
    return JSON.parse(serializedState)
  } catch (e) {
    console.warn('Failed to load state from localStorage:', e)
    return undefined
  }
}
export const getCommonProps = (name, label) => ({
  name,
  label,
  ariaLabel: name,
})
