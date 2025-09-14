import Box from '@mui/material/Box'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import { useSelector } from 'react-redux';

const ProgressBar = ({steps}) => {
  const currentStep = useSelector(state => state.form.currentStep)
  return (
    <Box className="p-4 md:pt-6">
      <Stepper activeStep={currentStep-1} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  )
}
export default ProgressBar
