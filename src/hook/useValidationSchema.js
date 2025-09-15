import { useTranslation } from 'react-i18next'
import * as yup from 'yup'

export const useValidationSchema = (currentStep) => {
  const { t } = useTranslation()

  const getPersonalInformationSchema = () =>
    yup.object().shape({
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
        .required(t('validations.phone')),
    })

  const getFamilyAndFinancialSchema = () =>
    yup.object().shape({
      maritalStatus: yup.string().required(t('validations.maritalStatus')),
      dependents: yup
        .number()
        .min(0)
        .required(t('validations.dependentsRequired'))
        .typeError(t('validations.dependents')),
      employmentStatus: yup
        .string()
        .required(t('validations.employmentStatus')),
      monthlyIncome: yup
        .number()
        .min(100)
        .max(5000)
        .required(t('validations.monthlyIncomeRequired'))
        .typeError(t('validations.monthlyIncome')),
      housingStatus: yup.string().required(t('validations.housingStatus')),
    })

  const getSituationDetailsSchema = () =>
    yup.object().shape({
      currentFinancialSituation: yup
        .string()
        .required(t('validations.currentFinancialSituation')),
      employmentCircumstances: yup
        .string()
        .required(t('validations.employmentCircumstances')),
      reasonForApplying: yup
        .string()
        .required(t('validations.reasonForApplying')),
    })

  const getSchemaForStep = (step) => {
    switch (step) {
      case 1:
        return getPersonalInformationSchema()
      case 2:
        return getFamilyAndFinancialSchema()
      case 3:
        return getSituationDetailsSchema()
      default:
        return getPersonalInformationSchema()
    }
  }

  return getSchemaForStep(currentStep)
}
