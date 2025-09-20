import React from 'react'
import {render, screen} from '../../../util/test-utils'
import Confirmation from '../index'

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => key,
  }),
}))

describe('Confirmation Component', () => {
  it('renders the headings and messages correctly', () => {
    render(<Confirmation />)
    expect(screen.getByText('applicationSubmitted')).toBeInTheDocument()
    expect(screen.getByText('applicationNumberMessage')).toBeInTheDocument()
    const img = screen.getByAltText('')
    expect(img).toHaveAttribute('src', 'public/success-tick.jpg')
    expect(img).toHaveAttribute('height', '300px')
    expect(img).toHaveAttribute('width', '300px')
  })
})
