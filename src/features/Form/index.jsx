import React, {useState, useEffect} from 'react'
import PersonalInformation from '../../components/PersonalInformation'
import {
  personalInformationSchema,
  familyandFinancialSchema,
  SituationDetailsSchema,
} from '../../util/validationSchemas'
import FamilyandFinancialInfo from '../../components/FamilyandFinancialInfo '
import SituationDetails from '../../components/SituationDetails'
import {useForm, FormProvider} from 'react-hook-form'
import {
  Box,
  Stepper,
  Step,
  StepLabel,
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
// import PaymentForm from '../../components/PaymentForm'
// import Review from '../../components/Review'
import dayjs from 'dayjs'

const Form = () => {
  const [validationSchema, setValidationSchema] = useState(
    personalInformationSchema
  )
  const [activeStep, setActiveStep] = useState(0)
  const methods = useForm({
    mode: 'onChange',
    resolver: yupResolver(validationSchema),
    defaultValues: {
      name: 'hgff',
      nationalId: '',
      dateOfBirth: dayjs('2022-04-17'),
      phone: '971545923',
      address: '',
      city: '',
      state: '',
      country: '',
      gender: 'female',
      mail: 'sdf@ws.com',

      maritalStatus: 'married',
      dependents: '',
      employmentStatus: '',
      monthlyIncome: '',
      housingStatus: '',

      currentFinancialSituation: '',
      employmentCircumstances: '',
      reasonForApplying: '',
    },
  })
  useEffect(() => {
    switch (activeStep) {
      case 0:
        setValidationSchema(personalInformationSchema)
        break
      case 1:
        setValidationSchema(familyandFinancialSchema)
        break
      case 2:
        setValidationSchema(SituationDetailsSchema)
        break
      default:
        setValidationSchema(personalInformationSchema)
    }
  }, [activeStep])
  function getStepContent(step) {
    switch (step) {
      case 0:
        return <PersonalInformation />
      case 1:
        return <FamilyandFinancialInfo />
      case 2:
        return <SituationDetails />
      default:
        console.log('Unknown step')
    }
  }

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1)
  }
  const {isDirty, isValid} = methods.formState
  const doErrorsExist =
    methods.formState.errors && Object.keys(methods.formState.errors).length > 0
  const isValidForm = !doErrorsExist && isValid && isDirty

  const handleNext = async () => {
    const isStepValid = await methods.trigger()
    const formValues = methods.getValues()
    console.log('Form Values:', formValues)

    console.log(formValues.dateOfBirth.format('MM/DD/YYYY'))
    console.log(methods.formState)
    if (isStepValid) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1)
    }
  }
  const [isCtaDisabled, setIsCtaDisabled] = useState(false)
  console.log(' Errors:', methods.formState.errors)
const steps = [
  'Personal Information',
  'Family and Financial Information',
  'Family Situation Details',
]
  useEffect(() => {
    const {isDirty, isValid} = methods.formState
    const doErrorsExist =
      methods.formState.errors &&
      Object.keys(methods.formState.errors).length > 0
    const isValidForm = !doErrorsExist && isValid && isDirty
    console.log('Current Errors:', doErrorsExist)
    console.log(' Errors:', methods.formState.errors)
    console.log({isValid})
    setIsCtaDisabled(!isValidForm)
  }, [methods.formState, activeStep])
  return (
    <main>
      <Paper
        elevation={3}
        className="bg-white rounded-2xl shadow-[0_5px_10px_#d6d9e6] flex flex-col h-[720px] mx-auto w-[940px] pt-4 px-[15px] pb-[15px]">
            <ProgressBar steps={steps}/>
  
        <Box className="p-4 lg:p-8">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <FormProvider {...methods}>
              {getStepContent(activeStep)}
              <Box
                className={`flex flex-col-reverse sm:flex-row items-end grow gap-4 pb-48 sm:pb-0 mt-8 mb-8 ${activeStep !== 0 ? 'justify-between' : 'justify-end'}`}>
                {activeStep !== 0 && (
                  <Button
                    className="w-full sm:w-fit md:w-[15rem]"
                    startIcon={<ChevronLeftRoundedIcon />}
                    onClick={handleBack}
                    variant="outlined">
                    Go Back
                  </Button>
                )}
                <Button
                  variant="contained"
                  endIcon={<ChevronRightRoundedIcon />}
                  // disabled={isCtaDisabled}
                  onClick={handleNext}
                  className="w-full sm:w-fit md:w-[15rem]">
                  {activeStep === steps.length - 1 ? 'confirm' : 'Next'}
                </Button>
              </Box>
            </FormProvider>
          </LocalizationProvider>
        </Box>
      </Paper>
    </main>
  )
}

export default Form
