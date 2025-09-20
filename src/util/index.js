//common error wrapper - try catch -try block for callbacks
export const tryCatchWrapper = (func, errorHandler) => {
  try {
    const result = func()

    // Handle promise-based functions
    if (result instanceof Promise) {
      return result.catch((error) => {
        errorHandler?.(error)
        return undefined
      })
    }

    // Handle synchronous functions
    return result
  } catch (error) {
    errorHandler?.(error)
    return undefined
  }
}

export const saveState = (state) => {
  tryCatchWrapper(
    () => {
      const serializedState = JSON.stringify(state)
      localStorage.setItem('formState', serializedState)
    },
    (e) => {
      console.warn('Failed to save form progress:', e)
    }
  )
}
export const readState = () =>
  tryCatchWrapper(
    () => {
      const serialized = localStorage.getItem('formState')
      return serialized ? JSON.parse(serialized) : undefined
    },
    (e) => {
      console.warn('Failed to load from storage:', e)
    }
  )

export const removeState = () => {
  localStorage.removeItem('formState')
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
