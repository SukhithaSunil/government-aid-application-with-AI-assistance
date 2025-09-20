import {Backdrop, Box, CircularProgress, Paper} from '@mui/material'
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs'
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider'
import {FormProvider} from 'react-hook-form'
import {useTranslation} from 'react-i18next'
import {GlobalErrorToast, ProgressBar} from '../../components'
import LanguageSwitch from '../../components/LanguageSwitch'
import {useMultiStepForm} from '../../hook/useMultiStepForm'
import ActionButtons from './ActionButtons'

const UserCreationForm = () => {
  const {t} = useTranslation()
  const {
    methods,
    StepComponent,
    steps,
    isCtaDisabled,
    loading,
    onSubmit,
    setHasVisitedPreviousStep,
    currentStep,
  } = useMultiStepForm()
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
              {StepComponent}
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

export default UserCreationForm
