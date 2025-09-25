import {
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Typography,
} from '@mui/material'
import {DatePicker} from '@mui/x-date-pickers'
import {Controller, useFormContext} from 'react-hook-form'
import {useTranslation} from 'react-i18next'
import {city, country, states} from './constants'
import {getCommonProps} from '../../../../util'
import ControlledTextField from '../../../../components/Form/ControlledTextField'

const PersonalInformation = () => {
  const {
    control,
    formState: {errors},
  } = useFormContext()
  const {t} = useTranslation()

  const getTextFieldProps = (name) => ({
    ...getCommonProps(name, `${t(name)}`),
    control,
    error: errors[name],
  })
  return (
    <Grid container spacing={3}>
      <Grid size={{xs: 12}}>
        <Typography variant="h5" gutterBottom className="text-center mb-2">
          {t('title1')}
        </Typography>
      </Grid>
      <Grid size={{xs: 12, md: 6}}>
        <ControlledTextField {...getTextFieldProps('name')} />
      </Grid>
      <Grid size={{xs: 12, md: 6}} className="mb-4">
        <Controller
          name="gender"
          control={control}
          render={({field}) => (
            <RadioGroup {...field} row>
              <FormControlLabel
                value="male"
                control={<Radio />}
                label={t('male')}
              />
              <FormControlLabel
                value="female"
                control={<Radio />}
                label={t('female')}
              />
            </RadioGroup>
          )}
        />
      </Grid>
      <Grid size={{xs: 12, md: 6}}>
        <ControlledTextField {...getTextFieldProps('mail')} />
      </Grid>

      <Grid size={{xs: 12, md: 6}} className="mb-6">
        <Controller
          name="dateOfBirth"
          control={control}
          render={({field}) => (
            <DatePicker
              label={t('dateOfBirth')}
              value={field.value || null}
              disableFuture
              onChange={field.onChange}
              renderInput={(params) => (
                <TextField
                  {...params}
                  error={!!errors.dateOfBirth}
                  helperText={errors.dateOfBirth?.message}
                />
              )}
            />
          )}
        />
      </Grid>
      <Grid size={{xs: 12}}>
        <ControlledTextField {...getTextFieldProps('address')} />
      </Grid>
      <Grid size={{xs: 12, md: 6}}>
        <ControlledTextField {...getTextFieldProps('phone')} />
      </Grid>
      <Grid size={{xs: 12, md: 6}}>
        <ControlledTextField {...getTextFieldProps('nationalId')} />
      </Grid>
      <Grid size={{xs: 12, md: 4}}>
        <ControlledTextField
          {...getTextFieldProps('city')}
          type="select"
          options={city}
        />
      </Grid>
      <Grid size={{xs: 12, md: 4}}>
        <ControlledTextField
          {...getTextFieldProps('state')}
          type="select"
          options={states}
        />
      </Grid>
      <Grid size={{xs: 12, md: 4}}>
        <ControlledTextField
          {...getTextFieldProps('country')}
          type="select"
          options={country}
        />
      </Grid>
    </Grid>
  )
}

export default PersonalInformation
