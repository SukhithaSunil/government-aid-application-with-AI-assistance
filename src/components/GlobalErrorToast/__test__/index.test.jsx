
import '@testing-library/jest-dom'
import { render, screen } from '../../../util//test-utils'
import GlobalErrorToast from '../index'

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => key,
  }),
}))

describe('GlobalErrorToast', () => {
  it('does not render when no errors exist', () => {
    render(<GlobalErrorToast />, {
      preloadedState: {
        form: { error: null },
        generateSuggestion: { error: null },
      },
    })

    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
  })

  it('renders and clears suggestion error', async () => {
    render(<GlobalErrorToast />, {
      preloadedState: {
        form: { error: null },
        generateSuggestion: { error: 'Something went wrong with AI' },
      },
    })

    const alert = await screen.findAllByRole('alert')
    expect(alert[0]).toBeInTheDocument()
    expect(alert[0]).toHaveTextContent('failedToFetchSuggestion')
  })


})
