import {TextField, MenuItem, Box} from '@mui/material'
import {Controller} from 'react-hook-form'
import PropTypes from 'prop-types'
import {useTranslation} from 'react-i18next'

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
  const {t} = useTranslation()
  return (
    <Controller
      name={name}
      control={control}
      render={({field}) => {
        return (
          <Box>
            <TextField
              fullWidth
              select={type === 'select'}
              multiline={isMultiLine}
              {...(isMultiLine && {minRows: 3})}
              {...field}
              slotProps={{
                htmlInput: {
                  'aria-label': ariaLabel,
                  role: type === 'select' ? 'combobox' : 'textbox',
                  'data-testid': name,
                  'aria-invalid': !!error,
                  'aria-describedby': error ? `${name}-error` : undefined,
                  ...inputProps,
                },
              }}
              label={label}
              error={Boolean(error)}>
              {type === 'select' &&
                options.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
            </TextField>
            <p
              id={`${name}-error`}
              className={`text-sm h-5 mt-1 ${error ? 'text-red-500' : 'invisible'}`}
              role="alert">
              {t(error?.message)}
            </p>
          </Box>
        )
      }}
    />
  )
}

ControlledTextField.propTypes = {
  control: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  ariaLabel: PropTypes.string.isRequired,
  inputProps: PropTypes.object,
  error: PropTypes.object,
  type: PropTypes.oneOf(['text', 'select']),
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    })
  ),
  isMultiLine: PropTypes.bool,
}

export default ControlledTextField
