import * as yup from 'yup'
import {
  mobileNumberRegex,
  nameRegex,
  nationalIdRegex,
} from '../../util/constants'

import PersonalInformation from './components/PersonalInformation'
import FamilyandFinancialInfo from './components/FamilyandFinancialInfo'
import SituationDetails from './components/SituationDetails'
import Confirmation from './components/Confirmation'

export const getStepsConfig = () => ({
  1: {
    component: <PersonalInformation />,
    schema: yup.object().shape({
      name: yup
        .string()
        .required('validations.name')
        .matches(nameRegex, 'validations.name_invalid'),
      mail: yup
        .string()
        .required('validations.mail')
        .email('validations.invalidMail'),
      nationalId: yup
        .string()
        .required('validations.nationalId')
        .matches(nationalIdRegex, 'validations.idFormat'),
      dateOfBirth: yup.date().required('validations.dateOfBirth'),
      address: yup.string().required('validations.address'),
      city: yup.string().required('validations.city'),
      state: yup.string().required('validations.state'),
      country: yup.string().required('validations.country'),
      gender: yup.string().required('validations.gender'),
      phone: yup
        .string()
        .required('validations.phone')
        .matches(mobileNumberRegex, 'validations.phoneFormat'),
    }),
  },
  2: {
    component: <FamilyandFinancialInfo />,
    schema: yup.object().shape({
      maritalStatus: yup.string().required('validations.maritalStatus'),
      dependents: yup
        .number()
        .max(10, 'validations.maxDependents')
        .required('validations.dependentsRequired')
        .typeError('validations.dependents'),
      employmentStatus: yup.string().required('validations.employmentStatus'),
      monthlyIncome: yup
        .number()
        .required('validations.monthlyIncomeRequired')
        .max(5000, 'validations.maxMonthlyIncome')
        .typeError('validations.inValidMonthlyIncome'),
      housingStatus: yup.string().required('validations.housingStatus'),
    }),
  },
  3: {
    component: <SituationDetails />,
    schema: yup.object().shape({
      currentFinancialSituation: yup
        .string()
        .required('validations.currentFinancialSituation'),
      employmentCircumstances: yup
        .string()
        .required('validations.employmentCircumstances'),
      reasonForApplying: yup.string().required('validations.reasonForApplying'),
    }),
  },
  4: {
    component: <Confirmation />,
    schema: null,
  },
})
