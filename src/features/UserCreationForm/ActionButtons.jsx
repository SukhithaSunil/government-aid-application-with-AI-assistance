import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded'
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded'
import {Box, Button} from '@mui/material'
import {useCallback} from 'react'
import {useTranslation} from 'react-i18next'
import {useDispatch, useSelector} from 'react-redux'
import {goBack} from '../../store/formSlice'

const ActionButtons = ({
  isCtaDisabled,
  labelForNextButton,
  handleNext,
  setHasVisitedPreviousStep,
}) => {
  const dispatch = useDispatch()
  const {t} = useTranslation()
  const {currentStep, completedStep} = useSelector((state) => state.form || {})

  const handleBack = useCallback(() => {
    if (currentStep - 1 === completedStep) {
      setHasVisitedPreviousStep(true)
    }
    dispatch(goBack())
  }, [currentStep, completedStep])

  return (
    <Box
      className={`flex flex-col-reverse px-[15px] sm:flex-row items-end grow gap-4 sm:pb-0 mb-4 ${
        currentStep !== 1 ? 'justify-between' : 'justify-end'
      }`}>
      {currentStep !== 1 && currentStep !== 4 && (
        <Button
          className="w-full sm:w-fit md:w-[15rem]"
          startIcon={<ChevronLeftRoundedIcon />}
          onClick={handleBack}
          variant="outlined">
          {t('labels.goBack')}
        </Button>
      )}
      {currentStep !== 4 && (
        <Button
          variant="contained"
          endIcon={<ChevronRightRoundedIcon />}
          disabled={isCtaDisabled}
          onClick={handleNext}
          aria-label={labelForNextButton}
          className="w-full sm:w-fit md:w-[15rem]">
          {labelForNextButton}
        </Button>
      )}
    </Box>
  )
}

export default ActionButtons
