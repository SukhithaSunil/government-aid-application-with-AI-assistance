import { yupResolver } from '@hookform/resolvers/yup'
import {
  Backdrop,
  Box,
  CircularProgress,
  CssBaseline,
  Paper,
} from '@mui/material'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import dayjs from 'dayjs'
import React, { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import {
  Confirmation,
  FamilyandFinancialInfo,
  GlobalErrorToast,
  LanguageSwitch,
  PersonalInformation,
  ProgressBar,
  SituationDetails,
} from '../../components'
import { createUserProfile, next } from '../../store/formSlice'
import {
  familyandFinancialSchema,
  personalInformationSchema,
  SituationDetailsSchema,
} from '../../util/validationSchemas'
import ActionButtons from './ActionButtons'

const Form = () => {
  const {t} = useTranslation()
  const dispatch = useDispatch()
  const {currentStep, completedStep, formState, loading} = useSelector(
    (state) => state.form
  )
  const validationSchema = React.useMemo(() => {
    switch (currentStep) {
      case 1:
        return personalInformationSchema
      case 2:
        return familyandFinancialSchema
      case 3:
        return SituationDetailsSchema
      default:
        return personalInformationSchema
    }
  }, [currentStep])

  const methods = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: yupResolver(validationSchema),
    defaultValues: {
      ...formState,
      dateOfBirth: formState.dateOfBirth
        ? dayjs(formState.dateOfBirth)
        : dayjs(),
    },
  })
  // useEffect(() => {
  //   console.log('mount')
  //   methods.reset({
  //     ...formState,
  //     dateOfBirth: formState.dateOfBirth
  //       ? dayjs(formState.dateOfBirth)
  //       : dayjs(),
  //   })
  // }, [formState])
  const steps = React.useMemo(
    () => [t('personalInfo'), t('familyInfo'), t('situation')],
    []
  )

  // useEffect(() => {
  //   switch (currentStep) {
  //     case 1:
  //       setValidationSchema(personalInformationSchema)
  //       break
  //     case 2:
  //       setValidationSchema(familyandFinancialSchema)
  //       break
  //     case 3:
  //       setValidationSchema(SituationDetailsSchema)
  //       break
  //     default:
  //       setValidationSchema(personalInformationSchema)
  //   }
  // }, [currentStep])
  const stepContent = React.useMemo(() => {
    switch (currentStep) {
      case 1:
        return <PersonalInformation />
      case 2:
        return <FamilyandFinancialInfo />
      case 3:
        return <SituationDetails />
      default:
        return <Confirmation />
    }
  }, [currentStep])

  console.log({validationSchema})

  const {isDirty, isValid, errors} = methods.formState
  const doErrorsExist = Object.keys(errors).length > 0
  const isStepCompleted = completedStep >= currentStep
  const isValidForm = isValid && !doErrorsExist && (isDirty || isStepCompleted)

  console.log(' Errors:', methods.formState.errors)
  console.log({isValid})
  console.log({isDirty})
  console.log({isValidForm})

useEffect(() => {
  const errorFields = Object.keys(methods.formState.errors)
    if (errorFields) methods.clearErrors(errorFields)
}, [isStepCompleted])

  const [isCtaDisabled, setIsCtaDisabled] = useState(false)
  useEffect(() => {
    setIsCtaDisabled(!isValidForm)
  }, [isValidForm])
  // useEffect(() => {
  //   if (currentStep <= completedStep) {
  //     triggerForm()
  //   }
  // }, [validationSchema])
  const onSubmit = (formData) => {
    const dateOfBirth = formData.dateOfBirth
    const formattedData = {
      ...formData,
      dateOfBirth: dayjs(dateOfBirth).format('MM/DD/YYYY')
    }
    if (currentStep === 3) {
      dispatch(createUserProfile(formattedData))
    } else {
      dispatch(next(formattedData))
    }
  }

  return (
    <main>
      <CssBaseline />
      <LanguageSwitch />
      <Paper
        elevation={3}
        className="bg-white rounded-2xl shadow-[0_5px_10px_#d6d9e6] flex flex-col lg:h-[780px] min-h-[780px] sm:min-h-[720px]  mx-auto lg:w-[940px] pt-4 px-[15px] pb-[15px]">
        <ProgressBar steps={steps} />
        <Box className="p-4 lg:pt-6">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <FormProvider {...methods}>{stepContent}</FormProvider>
          </LocalizationProvider>
        </Box>
        <ActionButtons
          isCtaDisabled={isCtaDisabled}
          labelForNextButton={
            currentStep === steps.length ? t('confirm') : t('next')
          }
          formData={methods.getValues()}
          handleNext={methods.handleSubmit(onSubmit)}
        />
        <Backdrop
          sx={(theme) => ({color: '#fff', zIndex: theme.zIndex.drawer + 1})}
          open={loading}>
          <CircularProgress color="inherit" />
        </Backdrop>
        <GlobalErrorToast />
      </Paper>
    </main>
  )
}

export default Form
