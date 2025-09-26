import {yupResolver} from '@hookform/resolvers/yup'
import dayjs from 'dayjs'
import {useEffect, useMemo, useState} from 'react'
import {useForm} from 'react-hook-form'
import {useTranslation} from 'react-i18next'
import {useDispatch, useSelector} from 'react-redux'
import {getStepsConfig} from '../pages/UserCreationForm/formStepsConfig'
import {
  fetchFailure,
  fetchLoading,
  fetchSuccess,
  next,
} from '../store/formSlice'
import {filterOutCompleatedFields, removeState} from '../util'
import {CREATE_USER_API_URL, DateFormat, HTTP_METHODS} from '../util/constants'
import useFetch from './useFetch'

export const useMultiStepForm = () => {
  const {t} = useTranslation()
  const dispatch = useDispatch()
  const form = useSelector((state) => state.form)
  const {currentStep, completedStep, formState, loading} = form
  const stepsConfig = useMemo(() => getStepsConfig(), [])
  const currentSchema = stepsConfig[currentStep]?.schema
  const StepComponent = stepsConfig[currentStep]?.component
  const steps = useMemo(
    () => [t('personalInfo'), t('familyInfo'), t('situation')],
    [t]
  )

  const methods = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: yupResolver(currentSchema),
    defaultValues: {
      ...formState,
      dateOfBirth: formState?.dateOfBirth
        ? dayjs(formState.dateOfBirth)
        : dayjs(),
    },
  })

  const {isDirty, isValid, errors} = methods.formState
  const doErrorsExist = Object.keys(errors).length > 0
  const isStepCompleted = completedStep >= currentStep
  const isValidForm = isValid && !doErrorsExist && (isDirty || isStepCompleted)

  const [hasVisitedPreviousStep, setHasVisitedPreviousStep] = useState(false)
  const [isCtaDisabled, setIsCtaDisabled] = useState(false)

  useEffect(() => {
    setIsCtaDisabled(!isValidForm)
  }, [isValidForm])

  const triggerForm = async () => {
    await methods.trigger()
  }

  useEffect(() => {
    const errorFields = Object.keys(methods.formState.errors)
    if (errorFields.length) methods.clearErrors(errorFields)

    if (isStepCompleted) triggerForm()
    else if (currentStep === completedStep + 1 && hasVisitedPreviousStep) {
      triggerForm()
      setHasVisitedPreviousStep(false)
    }
  }, [currentStep])

  const {execute} = useFetch(
    CREATE_USER_API_URL,
    HTTP_METHODS.POST,
    () => dispatch(fetchLoading()),
    () => {
      removeState()
      dispatch(fetchSuccess())
    },
    (err) => dispatch(fetchFailure(err.message))
  )

  const onSubmit = (formData) => {
    const dateOfBirth = formData.dateOfBirth
    const formattedData = {
      ...formData,
      dateOfBirth: dayjs(dateOfBirth).format(DateFormat),
    }

    if (currentStep === steps.length) {
      execute(formattedData)
    } else {
      const filteredData = filterOutCompleatedFields(currentStep, formattedData)
      dispatch(next(filteredData))
    }
  }

  return {
    methods,
    StepComponent,
    steps,
    isCtaDisabled,
    loading,
    onSubmit,
    setHasVisitedPreviousStep,
    currentStep,
  }
}
