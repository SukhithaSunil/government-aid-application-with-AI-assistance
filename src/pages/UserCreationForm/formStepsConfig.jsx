import * as yup from 'yup'
import {mobileNumberRegex, nameRegex, nationalIdRegex} from '../../util/constants'
import PersonalInformation from './components/PersonalInformation'
import FamilyandFinancialInfo from './components/FamilyandFinancialInfo'
import SituationDetails from './components/SituationDetails'
import Confirmation from './components/Confirmation'

export const getStepsConfig = (t) => ({
  1: {
    component: <PersonalInformation />,
    schema: yup.object().shape({
      name: yup
        .string()
        .required(t('validations.name'))
        .matches(nameRegex, t('validations.name_invalid')),
      mail: yup
        .string()
        .required(t('validations.mail'))
        .email(t('validations.invalidMail')),
      nationalId: yup
        .string()
        .required(t('validations.nationalId'))
        .matches(nationalIdRegex, t('validations.idFormat')),
      dateOfBirth: yup.date().required(t('validations.dateOfBirth')),
      address: yup.string().required(t('validations.address')),
      city: yup.string().required(t('validations.city')),
      state: yup.string().required(t('validations.state')),
      country: yup.string().required(t('validations.country')),
      gender: yup.string().required(t('validations.gender')),
      phone: yup
        .string()
        .required(t('validations.phone'))
        .matches(mobileNumberRegex, t('validations.phoneFormat')),
    }),
  },
  2: {
    component: <FamilyandFinancialInfo />,
    schema: yup.object().shape({
      maritalStatus: yup.string().required(t('validations.maritalStatus')),
      dependents: yup
        .number()
        .max(10, t('validations.maxDependents'))
        .required(t('validations.dependentsRequired'))
        .typeError(t('validations.dependents')),
      employmentStatus: yup
        .string()
        .required(t('validations.employmentStatus')),
      monthlyIncome: yup
        .number()
        .required(t('validations.monthlyIncomeRequired'))
        .max(5000, t('validations.maxMonthlyIncome'))
        .typeError(t('validations.inValidMonthlyIncome')),
      housingStatus: yup.string().required(t('validations.housingStatus')),
    }),
  },
  3: {
    component: <SituationDetails />,
    schema: yup.object().shape({
      currentFinancialSituation: yup
        .string()
        .required(t('validations.currentFinancialSituation')),
      employmentCircumstances: yup
        .string()
        .required(t('validations.employmentCircumstances')),
      reasonForApplying: yup
        .string()
        .required(t('validations.reasonForApplying')),
    }),
  },
  4: {
    component: <Confirmation />,
    schema: null,
  },
})
