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
// import PaymentForm from '../../components/PaymentForm'
// import Review from '../../components/Review'
import dayjs from 'dayjs'

const Form = () => {
  const steps = [' Account Details', 'Personal Info', 'Review and Submit']
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
      reasonforApplying: '',
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
    <Paper elevation={3}>
      <Box className="py-1">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <FormProvider {...methods}>
            {getStepContent(activeStep)}
            <Box
              sx={[
                {
                  display: 'flex',
                  flexDirection: {xs: 'column-reverse', sm: 'row'},
                  alignItems: 'end',
                  flexGrow: 1,
                  gap: 1,
                  pb: {xs: 12, sm: 0},
                  mt: {xs: 2, sm: 0},
                  mb: '60px',
                },
                activeStep !== 0
                  ? {justifyContent: 'space-between'}
                  : {justifyContent: 'flex-end'},
              ]}>
              {activeStep !== 0 && (
                <Button
                  startIcon={<ChevronLeftRoundedIcon />}
                  onClick={handleBack}
                  variant="outlined"
                  // sx={{display: {xs: 'none', sm: 'flex'}}}
                sx={{width: {xs: '100%', sm: 'fit-content'}}}

                  >
                  Previous
                </Button>
              )}
              <Button
                variant="contained"
                endIcon={<ChevronRightRoundedIcon />}
                // disabled={isCtaDisabled}
                onClick={handleNext}
                sx={{width: {xs: '100%', sm: 'fit-content'}}}>
                {activeStep === steps.length - 1 ? 'confirm' : 'Next'}
              </Button>
            </Box>
          </FormProvider>
        </LocalizationProvider>
      </Box>
    </Paper>
  )
}

export default Form
