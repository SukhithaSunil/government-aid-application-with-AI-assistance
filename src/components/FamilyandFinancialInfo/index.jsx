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
import {useTranslation} from 'react-i18next'
import {getCommonProps} from '../../util/index'

const FamilyandFinancialInfo = () => {
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
      <Grid itemsize={{xs: 12, md: 6}} sx={{m: 1, minWidth: 150}}>
        <ControlledTextField
          {...getTextFieldProps('maritalStatus')}
          type="select"
          options={maritalStatus}
        />
      </Grid>
      <Grid item size={{xs: 12, md: 6}} sx={{m: 1, minWidth: 150}}>
        <ControlledTextField
          {...getTextFieldProps('employmentStatus')}
          type="select"
          options={employmentStatus}
        />
      </Grid>
      <Grid item size={{xs: 12, md: 6}} sx={{m: 1, minWidth: 150}}>
        <ControlledTextField
          {...getTextFieldProps('housingStatus')}
          type="select"
          options={housingStatus}
        />
      </Grid>
      <Grid itemsize={{xs: 12, md: 6}}>
        <ControlledTextField {...getTextFieldProps('dependents')} />
      </Grid>
      <Grid item size={{xs: 12, md: 6}}>
        <ControlledTextField {...getTextFieldProps('monthlyIncome')} />
      </Grid>
    </Grid>
  )
}

export default FamilyandFinancialInfo
