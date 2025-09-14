import * as yup from 'yup'

export const personalInformationSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  mail: yup
    .string()
    .email('Invalid email format')
    .required('Email is required'),
  nationalId: yup.string().required('National ID is required'),
  dateOfBirth: yup.date().required('Date of Birth is required'),
  address: yup.string().required('Address is required'),
  city: yup.string().required('City is required'),
  state: yup.string().required('State is required'),
  country: yup.string().required('Country is required'),
  gender: yup.string().required('Gender is required'),
  phone: yup
    .string()
    .matches(/^[0-9]{9}$/, 'Phone number must be 9 digits')
    .required('Phone number is required'),
})

export const familyandFinancialSchema = yup.object().shape({
  maritalStatus: yup.string().required('Marital Status is required'),
  dependents: yup
    .number()
    .min(0)
    .required('Number of Dependents is required')
    .typeError('Dependents must be a number'),
  employmentStatus: yup.string().required('Employment Status is required'),
  monthlyIncome: yup
    .number()
    .min(100)
    .required('Monthly Income is required')
    .typeError('Monthly Income must be a number'),
  housingStatus: yup.string().required('Housing Status is required'),
})

export const SituationDetailsSchema = yup.object().shape({
  currentFinancialSituation: yup
    .string()
    .required('Current Financial Situation is required'),
  employmentCircumstances: yup
    .string()
    .required('Employment Circumstances is required'),
  reasonForApplying: yup.string().required('Reason for Applying is required'),
})

export const checkoutSchema = personalInformationSchema
  .concat(familyandFinancialSchema)
  .concat(SituationDetailsSchema)
