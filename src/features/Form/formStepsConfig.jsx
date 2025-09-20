import * as yup from 'yup'
import {
  Confirmation,
  FamilyandFinancialInfo,
  PersonalInformation,
  SituationDetails,
} from '../../components'

export const getStepsConfig = (t) => ({
  1: {
    component: <PersonalInformation />,
    schema: yup.object().shape({
      name: yup.string().required(t('validations.name')),
      mail: yup
        .string()
        .email(t('validations.invalidMail'))
        .required(t('validations.mail')),
      nationalId: yup.string().required(t('validations.nationalId')),
      dateOfBirth: yup.date().required(t('validations.dateOfBirth')),
      address: yup.string().required(t('validations.address')),
      city: yup.string().required(t('validations.city')),
      state: yup.string().required(t('validations.state')),
      country: yup.string().required(t('validations.country')),
      gender: yup.string().required(t('validations.gender')),
      phone: yup
        .string()
        .matches(/^[0-9]{9}$/, t('validations.phoneFormat'))
        .typeError(t('validations.phone'))
        .required(t('validations.phone')),
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
        .max(5000, t('validations.maxMonthlyIncome'))
        .required(t('validations.monthlyIncomeRequired'))
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
