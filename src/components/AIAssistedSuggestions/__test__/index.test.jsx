import {render, screen, fireEvent} from '../../../util/test-utils'
import React from 'react'
import {Suggestions} from '../index'
import * as reactI18next from 'react-i18next'
import * as reactHookForm from 'react-hook-form'

jest.mock('react-i18next')
jest.mock('react-hook-form')

describe('Suggestions Component', () => {
  const togglePopup = jest.fn()
  const onAccept = jest.fn()
  const setValue = jest.fn()
  const defaultProps = {
    togglePopup,
    open: true,
    title: 'Test Title',
    description: 'This is a test description.',
    onAccept,
    activeField: 'fieldName',
  }

  beforeEach(() => {
    jest.clearAllMocks()
    reactI18next.useTranslation.mockReturnValue({
      t: (key) => {
        if (key === 'labels.edit') return 'Edit'
        if (key === 'labels.accept') return 'Accept'
        return key
      },
    })
    reactHookForm.useFormContext.mockReturnValue({
      setValue,
    })
  })

  it('renders modal with title and description', () => {
    render(<Suggestions {...defaultProps} />)

    expect(screen.getByRole('dialog')).toBeInTheDocument()
    expect(screen.getByRole('heading', {level: 2})).toHaveTextContent(
      'Test Title'
    )
    expect(screen.getByText('This is a test description.')).toBeInTheDocument()

    expect(screen.getByRole('button', {name: /Edit/i})).toBeInTheDocument()
    expect(screen.getByRole('button', {name: /Accept/i})).toBeInTheDocument()
  })

  it('updates text area value on change', () => {
    render(<Suggestions {...defaultProps} />)

    fireEvent.click(screen.getByRole('button', {name: /Edit/i}))

    const textarea = screen.getByRole('textbox')
    fireEvent.change(textarea, {target: {value: 'Updated description'}})

    expect(textarea).toHaveValue('Updated description')
  })

  it('calls onAccept with edited text when Accept button clicked', () => {
    render(<Suggestions {...defaultProps} />)

    fireEvent.click(screen.getByRole('button', {name: /Edit/i}))
    const textarea = screen.getByRole('textbox')
    fireEvent.change(textarea, {target: {value: 'Edited text'}})

    fireEvent.click(screen.getByRole('button', {name: /Accept/i}))

    expect(onAccept).toHaveBeenCalledWith('Edited text')
  })

  it('calls onAccept with original description if not edited', () => {
    render(<Suggestions {...defaultProps} />)

    fireEvent.click(screen.getByRole('button', {name: /Accept/i}))

    expect(onAccept).toHaveBeenCalledWith(defaultProps.description)
  })

  it('calls togglePopup and resets form value when modal is closed', () => {
    render(<Suggestions {...defaultProps} />)

    const closeButton = screen.getByRole('button', {name: /Close/i})
    fireEvent.click(closeButton)

    expect(setValue).toHaveBeenCalledWith(defaultProps.activeField, '', {
      shouldDirty: true,
      shouldTouch: true,
    })
    expect(togglePopup).toHaveBeenCalled()
  })

  it('resets editing state and editedText when description changes', () => {
    const {rerender} = render(<Suggestions {...defaultProps} />)

    fireEvent.click(screen.getByRole('button', {name: /Edit/i}))
    const textarea = screen.getByRole('textbox')
    fireEvent.change(textarea, {target: {value: 'Changed text'}})

    rerender(
      <Suggestions {...defaultProps} description="New description text" />
    )

    expect(screen.queryByRole('textbox')).not.toBeInTheDocument()
    expect(screen.getByText('New description text')).toBeInTheDocument()
  })
})
