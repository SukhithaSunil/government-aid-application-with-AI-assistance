import {yupResolver} from '@hookform/resolvers/yup'
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs'
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider'
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded'
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded'
import {Box, Button, Paper, Backdrop, CircularProgress} from '@mui/material'
import dayjs from 'dayjs'
import React, {useEffect, useState} from 'react'
import {FormProvider, useForm} from 'react-hook-form'
import {useTranslation} from 'react-i18next'
import {useDispatch, useSelector} from 'react-redux'
import {
  Confirmation,
  FamilyandFinancialInfo,
  LanguageSwitch,
  PersonalInformation,
  ProgressBar,
  SituationDetails,
  GlobalErrorToast,
} from '../../components'
import {createUserProfile, goBack, next} from '../../store/formSlice'
import {
  familyandFinancialSchema,
  personalInformationSchema,
  SituationDetailsSchema,
} from '../../util/validationSchemas'

const Form = () => {
  const {t} = useTranslation()
  const [validationSchema, setValidationSchema] = useState(
    personalInformationSchema
  )
  const {currentStep, completedStep, formState, loading} = useSelector(
    (state) => state.form
  )
  const [open, setLoading] = React.useState(false)

  useEffect(() => {
    setLoading(loading)
  }, [loading])

  const dispatch = useDispatch()
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
  useEffect(() => {
    console.log('mount')
    methods.reset({
      ...formState,
      dateOfBirth: formState.dateOfBirth
        ? dayjs(formState.dateOfBirth)
        : dayjs(),
    })
  }, [formState])
  const steps = [t('personalInfo'), t('familyInfo'), t('situation')]
  useEffect(() => {
    switch (currentStep) {
      case 1:
        setValidationSchema(personalInformationSchema)
        break
      case 2:
        setValidationSchema(familyandFinancialSchema)
        break
      case 3:
        setValidationSchema(SituationDetailsSchema)
        break
      default:
        setValidationSchema(personalInformationSchema)
    }
  }, [currentStep])
  function getStepContent() {
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
  }

  const handleBack = async () => {
    dispatch(goBack())
  }
  console.log({validationSchema})

  const {isDirty, isValid, errors} = methods.formState
  const doErrorsExist = Object.keys(errors).length > 0
  const isValidForm = isDirty && !doErrorsExist && isValid
  console.log(' Errors:', methods.formState.errors)
  console.log({isValid})
  console.log({isDirty})
  console.log({isValidForm})
  const triggerForm = async () => {
    await methods.trigger()
  }
  const handleNext = async () => {
    // const isStepValid = await methods.trigger()
    const formValues = methods.getValues()
    const {dateOfBirth} = formValues
    formValues.dateOfBirth = dateOfBirth.format('MM/DD/YYYY')
    console.log({formValues})
    if (currentStep === 3) dispatch(createUserProfile(formState))
    else dispatch(next(formValues))
  }
  const [isCtaDisabled, setIsCtaDisabled] = useState(false)
  useEffect(() => {
    setIsCtaDisabled(!isValidForm)
  }, [isValidForm])
  // useEffect(() => {
  //   if (currentStep <= completedStep) {
  //     triggerForm()
  //   }
  // }, [validationSchema])
  return (
    <main>
      <LanguageSwitch />
      <Paper
        elevation={3}
        className="bg-white rounded-2xl shadow-[0_5px_10px_#d6d9e6] flex flex-col md:h-[780px] mx-auto md:w-[940px] pt-4 px-[15px] pb-[15px]">
        <ProgressBar steps={steps} />
        <Box className="p-4 lg:pt-4">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <FormProvider {...methods}>
              {getStepContent()}
              <Box
                className={`flex flex-col-reverse sm:flex-row items-end grow gap-4 md:pb-48 sm:pb-0 mt-8 mb-8 ${currentStep !== 1 ? 'justify-between' : 'justify-end'}`}>
                {currentStep !== 1 && currentStep !== 4 && (
                  <Button
                    className="w-full sm:w-fit md:w-[15rem]"
                    startIcon={<ChevronLeftRoundedIcon />}
                    onClick={handleBack}
                    variant="outlined">
                    Go Back
                  </Button>
                )}
                {currentStep !== 4 && (
                  <Button
                    variant="contained"
                    endIcon={<ChevronRightRoundedIcon />}
                    disabled={isCtaDisabled}
                    onClick={handleNext}
                    className="w-full sm:w-fit md:w-[15rem]">
                    {currentStep === steps.length ? t('confirm') : t('next')}
                  </Button>
                )}
              </Box>
            </FormProvider>
          </LocalizationProvider>
        </Box>
        <Backdrop
          sx={(theme) => ({color: '#fff', zIndex: theme.zIndex.drawer + 1})}
          open={open}>
          <CircularProgress color="inherit" />
        </Backdrop>
        <GlobalErrorToast />
      </Paper>
    </main>
  )
}

export default Form
