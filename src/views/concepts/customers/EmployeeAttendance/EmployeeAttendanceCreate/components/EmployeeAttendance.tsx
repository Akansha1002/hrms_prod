import { useEffect } from 'react'
import { UseFormReturn } from 'react-hook-form'
import isEmpty from 'lodash/isEmpty'

import Container from '@/components/shared/Container'
import { Form } from '@/components/ui/Form'
import type { CommonProps } from '@/@types/common'
import AttendanceForm from './EmployeeAttendanceForm'

import { AttendanceSchema } from '../EmployeeAttendanceCreate'

type DetailsProps = {
  form: UseFormReturn<AttendanceSchema>
  defaultValues?: AttendanceSchema
} & CommonProps

const EmployeeAttendance = ({ form, defaultValues  }: DetailsProps) => {
  const {
    handleSubmit,
    reset,
    formState: { errors },
    control,
    watch,
    setValue,
  } = form

  useEffect(() => {
    if (!isEmpty(defaultValues)) {
      reset(defaultValues)
    }
  }, [defaultValues, reset])

  return (
    <Form className="flex w-full h-full" containerClassName="flex flex-col w-full justify-between">
      <Container>
        <div className="gap-4 flex flex-col flex-auto">
          <AttendanceForm
            control={control}
            errors={errors}
            data={defaultValues}
            watch={watch}
            setValue={setValue}
          />
        </div>
      </Container>
    </Form>
  )
}

export default EmployeeAttendance
