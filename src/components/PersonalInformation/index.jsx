import React, {useState} from 'react'
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Button,
  FormControlLabel,
  RadioGroup,
  Radio,
  Grid,
} from '@mui/material'
import {useFormContext, Controller} from 'react-hook-form'
import ControlledTextField from '../Form/ControlledTextField'
import dayjs from 'dayjs'
import {DatePicker} from '@mui/x-date-pickers'
import {city, states, country} from '../../util/constants'
const PersonalInformation = () => {
  const {
    control,
    formState: {errors},
  } = useFormContext()
  const getTextFieldProps = (name) => ({
    name,
    label: `${name}`,
    ariaLabel: name,
    control,
    error: errors[name],
  })
  return (
    <Grid container spacing={3}>
      <Grid  size={{xs: 12, md: 6}}>
        <ControlledTextField {...getTextFieldProps('name')}/>
      </Grid>
       <Grid  size={{xs: 12, md: 6}}>
        <Controller
          name="gender"
          control={control}
          render={({field}) => (
            <RadioGroup {...field} row>
              <FormControlLabel value="male" control={<Radio />} label="Male" />
              <FormControlLabel
                value="female"
                control={<Radio />}
                label="Female"
              />
            </RadioGroup>
          )}
        />
      </Grid>
      <Grid  size={{xs: 12, md: 6}}>
        <ControlledTextField {...getTextFieldProps('mail')} />
      </Grid>
      
         <Grid  size={{xs: 12, md: 6}}>
        <Controller
          name="dateOfBirth"
          control={control}
          render={({field}) => (
            <DatePicker
              label="Date of Birth"
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
      <Grid  size={{xs: 12}}>
        <ControlledTextField {...getTextFieldProps('address')} />
      </Grid>
      <Grid  size={{xs: 12, md: 6}}>
        <ControlledTextField {...getTextFieldProps('phone')} />
      </Grid>
      <Grid  size={{xs: 12, md: 6}}>
        <ControlledTextField {...getTextFieldProps('nationalId')} />
      </Grid>
      <Grid  size={{xs: 12, md: 4}}>
        <ControlledTextField
          {...getTextFieldProps('city')}
          type="select"
          options={city}
        />
      </Grid>
      <Grid  size={{xs: 12, md: 4}}>
        <ControlledTextField
          {...getTextFieldProps('state')}
          type="select"
          options={states}
        />
      </Grid>
      <Grid item size={{xs: 12, md: 4}}>
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
