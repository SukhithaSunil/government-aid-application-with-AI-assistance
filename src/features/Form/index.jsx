import {yupResolver} from '@hookform/resolvers/yup'
import {
  Backdrop,
  Box,
  CircularProgress,
  CssBaseline,
  Paper,
} from '@mui/material'
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs'
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider'
import dayjs from 'dayjs'
import React, {useEffect, useState} from 'react'
import {FormProvider, useForm} from 'react-hook-form'
import {useTranslation} from 'react-i18next'
import {useDispatch, useSelector} from 'react-redux'
import {
  Confirmation,
  FamilyandFinancialInfo,
  GlobalErrorToast,
  LanguageSwitch,
  PersonalInformation,
  ProgressBar,
  SituationDetails,
} from '../../components'
import {createUserProfile, next} from '../../store/formSlice'
import {filterOutCompleatedFields} from '../../util/index'
import ActionButtons from './ActionButtons'
import {useValidationSchema} from '../../hook/useValidationSchema'

const Form = () => {
  const {t} = useTranslation()
  const dispatch = useDispatch()
  const {currentStep, completedStep, formState, loading} = useSelector(
    (state) => state.form
  )
  const [hasVisitedPreviousStep, setHasVisitedPreviousStep] = useState(false)
  const validationSchema = useValidationSchema(currentStep)

  const methods = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: yupResolver(validationSchema),
    defaultValues: {
      ...formState,
      dateOfBirth: formState?.dateOfBirth
        ? dayjs(formState.dateOfBirth)
        : dayjs(),
    },
  })
  const steps = React.useMemo(
    () => [t('personalInfo'), t('familyInfo'), t('situation')],
    [t]
  )

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

  const {isDirty, isValid, errors} = methods.formState
  const doErrorsExist = Object.keys(errors).length > 0
  const isStepCompleted = completedStep >= currentStep
  const isValidForm = isValid && !doErrorsExist && (isDirty || isStepCompleted)

  const triggerForm = async (data) => {
    await methods.trigger(data)
  }
  useEffect(() => {
    const errorFields = Object.keys(methods.formState.errors)
    if (errorFields) methods.clearErrors(errorFields)
    if (isStepCompleted) triggerForm()
    else if (currentStep === completedStep + 1 && hasVisitedPreviousStep) {
      triggerForm()
      setHasVisitedPreviousStep(false)
    }
  }, [currentStep])

  const [isCtaDisabled, setIsCtaDisabled] = useState(false)
  useEffect(() => {
    setIsCtaDisabled(!isValidForm)
  }, [isValidForm])

  const onSubmit = (formData) => {
    const dateOfBirth = formData.dateOfBirth
    const formattedData = {
      ...formData,
      dateOfBirth: dayjs(dateOfBirth).format('MM/DD/YYYY'),
    }
    if (currentStep === steps.length) {
      dispatch(createUserProfile(formattedData))
    } else {
      const filteredData = filterOutCompleatedFields(currentStep, formattedData)
      dispatch(next(filteredData))
    }
  }

  return (
    <main>
      <LanguageSwitch />
      <Paper
        elevation={3}
        className="bg-white rounded-2xl shadow-[0_5px_10px_#d6d9e6] flex flex-col lg:h-[780px] min-h-[780px] sm:min-h-[720px]  mx-auto lg:w-[940px] pt-4 px-[15px] pb-[15px]">
        <ProgressBar steps={steps} />
        <FormProvider {...methods}>
          <Box className="p-4 lg:pt-6">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              {stepContent}
            </LocalizationProvider>
          </Box>
          <ActionButtons
            isCtaDisabled={isCtaDisabled}
            labelForNextButton={
              currentStep === steps.length
                ? t('labels.confirm')
                : t('labels.next')
            }
            handleNext={methods.handleSubmit(onSubmit)}
            setHasVisitedPreviousStep={setHasVisitedPreviousStep}
          />
        </FormProvider>
        <Backdrop open={loading}>
          <CircularProgress />
        </Backdrop>
        <GlobalErrorToast />
      </Paper>
    </main>
  )
}

export default Form
