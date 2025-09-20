import {Box, Step, StepLabel, Stepper} from '@mui/material'
import {useSelector} from 'react-redux'
import PropTypes from 'prop-types'

const ProgressBar = ({steps}) => {
  const {currentStep} = useSelector((state) => state.form)
  const activeStep = currentStep - 1
  return (
    <Box
      className="p-4 md:pt-6"
      role="group"
      aria-label="Form progress indicator">
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label, index) => {
          const isActive = activeStep === index
          return (
            <Step key={label}>
              <StepLabel aria-current={isActive ? 'step' : undefined}>
                {label}
              </StepLabel>
            </Step>
          )
        })}
      </Stepper>
    </Box>
  )
}

ProgressBar.propTypes = {
  steps: PropTypes.arrayOf(PropTypes.string).isRequired,
}

export default ProgressBar
