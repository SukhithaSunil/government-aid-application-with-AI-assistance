import {Grid, Typography} from '@mui/material'
import {useFormContext} from 'react-hook-form'
import {useTranslation} from 'react-i18next'
import {getCommonProps} from '../../util'
import ControlledTextField from '../Form/ControlledTextField'
import {employmentStatus, housingStatus, maritalStatus} from './constants'

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
      <Grid size={{xs: 12}}>
        <Typography variant="h5" gutterBottom className="text-center mb-2">
          {t('title2')}
        </Typography>
      </Grid>
      <Grid size={{xs: 12, md: 6}}>
        <ControlledTextField
          {...getTextFieldProps('maritalStatus')}
          type="select"
          options={maritalStatus}
        />
      </Grid>
      <Grid size={{xs: 12, md: 6}}>
        <ControlledTextField
          {...getTextFieldProps('housingStatus')}
          type="select"
          options={housingStatus}
        />
      </Grid>
      <Grid size={{xs: 12, md: 6}}>
        <ControlledTextField
          {...getTextFieldProps('employmentStatus')}
          type="select"
          options={employmentStatus}
        />
      </Grid>
      <Grid size={{xs: 12, md: 6}}>
        <ControlledTextField {...getTextFieldProps('dependents')} />
      </Grid>
      <Grid size={{xs: 12, md: 6}}>
        <ControlledTextField {...getTextFieldProps('monthlyIncome')} />
      </Grid>
    </Grid>
  )
}

export default FamilyandFinancialInfo
