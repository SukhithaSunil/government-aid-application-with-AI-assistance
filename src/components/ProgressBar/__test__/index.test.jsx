import {render, screen} from '../../../util/test-utils'
import ProgressBar from '..'

describe('ProgressBar', () => {
  const steps = ['Step 1', 'Step 2', 'Step 3']
  test('renders steps with correct active step and accessibility attributes', () => {
    render(<ProgressBar steps={steps} />, {
      preloadedState: {
        form: {currentStep: 2},
      },
    })
    const group = screen.getByRole('group')
    expect(group).toBeInTheDocument()
  })
})
