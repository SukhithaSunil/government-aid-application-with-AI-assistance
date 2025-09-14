import React, {useState, useEffect} from 'react'
import PersonalInformation from '../../components/PersonalInformation'
import {
  personalInformationSchema,
  familyandFinancialSchema,
  SituationDetailsSchema,
} from '../../util/validationSchemas'
import FamilyandFinancialInfo from '../../components/FamilyandFinancialInfo '
import SituationDetails from '../../components/SituationDetails'
import Confirmation from '../../components/Confirmation'
import {useForm, FormProvider} from 'react-hook-form'
import {
  Box,
  Stack,
  Step,
  Switch,
  Button,
  Typography,
  Paper,
} from '@mui/material'
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded'
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded'
import {yupResolver} from '@hookform/resolvers/yup'
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider'
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs'
import ProgressBar from '../../components/ProgressBar'
import {useSelector, useDispatch} from 'react-redux'
import {next, goBack, createUserProfile} from '../../store/formSlice'
import dayjs from 'dayjs'
import {LanguageSwitch} from '../../components/LanguageSwitch'
import {useTranslation} from 'react-i18next'

const Form = () => {
  const {t} = useTranslation()
  const [validationSchema, setValidationSchema] = useState(
    personalInformationSchema
  )
  const {currentStep, completedStep, formState} = useSelector(
    (state) => state.form
  )
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
    const steps = [
    t('personalInfo'),
    t('familyInfo'),
    t('situation'),
  ]
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
    if(currentStep === 3)
      dispatch(createUserProfile(formState))
    else
    dispatch(next(formValues))
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
                    {currentStep === steps.length ? 'confirm' : 'Next'}
                  </Button>
                )}
              </Box>
            </FormProvider>
          </LocalizationProvider>
        </Box>
      </Paper>
    </main>
  )
}

export default Form
