import React, {useState} from 'react'
import {
  Box,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  FormControlLabel,
  RadioGroup,
  TextareaAutosize,
  Grid,
} from '@mui/material'
import {useFormContext, Controller} from 'react-hook-form'
import ControlledTextField from '../Form/ControlledTextField'
import dayjs from 'dayjs'
import {DatePicker} from '@mui/x-date-pickers'
import {
  maritalStatus,
  employmentStatus,
  housingStatus,
} from '../../util/constants'
const SituationDetails = () => {
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
      <Grid item size={{xs: 12, md: 5}} sx={{m: 1, minWidth: 100}}>
        <ControlledTextField
          {...getTextFieldProps('currentFinancialSituation')}
          isMultiLine
        />
      </Grid>

      <Grid item size={{xs: 12, md: 5}} sx={{m: 1, minWidth: 100}}>
        <ControlledTextField
          {...getTextFieldProps('employmentCircumstances')}
          isMultiLine
        />
      </Grid>
      <Grid item size={{xs: 12, md: 5}} sx={{m: 1, minWidth: 100}}>
        <ControlledTextField
          {...getTextFieldProps('reasonForApplying')}
          isMultiLine
        />
      </Grid>
    </Grid>
  )
}

export default SituationDetails
