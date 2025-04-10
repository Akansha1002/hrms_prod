
import { useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import isEmpty from "lodash/isEmpty"
import AttendanceForm from "./AttendanceForm"
import Container from "@/components/shared/Container"
import BottomStickyBar from "@/components/template/BottomStickyBar"
import { Form } from "@/components/ui/Form"
import type { CommonProps } from "@/@types/common"

export type AttendanceSchema = {
  employee_number: string
  reason: string | null
  date: string
  status: string
}

type AttendanceProps = {
  onFormSubmit: (values: AttendanceSchema) => void
  defaultValues?: AttendanceSchema
} & CommonProps

const validationSchema = z.object({
  employee_number: z.string().min(1, "Employee number is required"),
  reason: z.string().nullable(),
  date: z.string().min(1, "Date is required"),
  status: z.string().min(1, "Status is required"),
})

const AttendanceRegularisation = (props: AttendanceProps) => {
  const { onFormSubmit, defaultValues = {}, children } = props
  const {
    handleSubmit,
    reset,
    formState: { errors },
    control,
  } = useForm<AttendanceSchema>({
    defaultValues,
    resolver: zodResolver(validationSchema),
  })

  useEffect(() => {
    if (!isEmpty(defaultValues)) {
      reset(defaultValues)
    }
  }, [defaultValues, reset])

  return (
    <Form
      className="flex w-full h-full"
      containerClassName="flex flex-col w-full justify-between"
      onSubmit={handleSubmit(onFormSubmit)}
    >
      <Container>
        <div className="flex items-center justify-between">
          <div className="gap-4 flex flex-col flex-auto">
            <AttendanceForm control={control} errors={errors} data={defaultValues} />
          </div>
        </div>
        {/* <AttendanceForm control={control} errors={errors} data={defaultValues} /> */}
      </Container>
      <BottomStickyBar>{children}</BottomStickyBar>
    </Form>
  )
}

export default AttendanceRegularisation

