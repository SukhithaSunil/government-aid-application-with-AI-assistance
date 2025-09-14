import React from 'react'
import {TextField, MenuItem} from '@mui/material'
import {Controller} from 'react-hook-form'

const ControlledTextField = ({
  control,
  name,
  label,
  ariaLabel,
  inputProps = {},
  error,
  type = 'text',
  options = [],
  isMultiLine = false,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({field}) => {
        return (
          <TextField
            fullWidth
            select={type === 'select'}
            multiline={isMultiLine}
            minRows={isMultiLine ? 3 : 1}
            {...field}
            slotProps={{
              htmlInput: {
                'aria-label': ariaLabel,
                role: type === 'select' ? 'combobox' : 'textbox',
                'data-testid': name,
                ...inputProps,
              },
            }}
            label={label}
            error={Boolean(error)}
            helperText={error?.message}>
            {type === 'select' &&
              options.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
          </TextField>
        )
      }}
    />
  )
}

export default ControlledTextField
