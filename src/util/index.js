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

export const removeState = () => {
  if (localStorage.getItem('formState')) {
    localStorage.removeItem('formState')
  }
}
export const getCommonProps = (name, label) => ({
  name,
  label,
  ariaLabel: name,
})

export const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

export const filterOutCompleatedFields = (currenttStep, formData) => {
  let fields = []
  switch (currenttStep) {
    case 1:
      fields = [
        'name',
        'nationalId',
        'dateOfBirth',
        'phone',
        'address',
        'city',
        'state',
        'country',
        'gender',
        'mail',
      ]
      break
    case 2:
      fields = [
        'maritalStatus',
        'dependents',
        'employmentStatus',
        'monthlyIncome',
        'housingStatus',
      ]
      break
    case 3:
      fields = [
        'currentFinancialSituation',
        'employmentCircumstances',
        'reasonForApplying',
      ]
      break
  }
  const currentStepData = fields.reduce((obj, key) => {
    obj[key] = formData[key]
    return obj
  }, {})
  return currentStepData
}
