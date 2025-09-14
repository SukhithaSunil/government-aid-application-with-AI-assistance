/* eslint-env jest */

import {render, screen} from '@testing-library/react'
import {Toast} from '../index'
import '@testing-library/jest-dom'
import {fireEvent} from '@testing-library/react'
test('renders snackbar', () => {
  const mockHandleClose = jest.fn()
  const component = render(
    <Toast
      {...{message: 'error', open: true, handleClose: {mockHandleClose}}}
    />
  )
//   expect(component).toMatchSnapshot()
  const alert = screen.getByTestId('alert')
  expect(alert).toBeInTheDocument()
  const text = screen.getByText('error')
  expect(text).toBeInTheDocument()
//   fireEvent.click(alert)
//   expect(mockHandleClose).toHaveBeenCalledTimes(1)
})
