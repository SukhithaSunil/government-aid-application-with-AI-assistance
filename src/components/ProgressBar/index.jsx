import {Box, Step, StepLabel, Stepper} from '@mui/material'
import {useSelector} from 'react-redux'

const ProgressBar = ({steps}) => {
  const currentStep = useSelector((state) => state.form.currentStep)

  return (
    <Box
      className="p-4 md:pt-6"
      role="group"
      aria-label="Form progress indicator">
      <Stepper activeStep={currentStep - 1} alternativeLabel>
        {steps.map((label, index) => {
          const isActive = currentStep - 1 === index
          return (
            <Step key={label}>
              <StepLabel
                aria-current={isActive ? 'step' : undefined}>
                {label}
              </StepLabel>
            </Step>
          )
        })}
      </Stepper>
    </Box>
  )
}

export default ProgressBar
