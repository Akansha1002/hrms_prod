
import { useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, UseFormReturn } from "react-hook-form"
import { z } from "zod"
import isEmpty from "lodash/isEmpty"

import Container from "@/components/shared/Container"
import BottomStickyBar from "@/components/template/BottomStickyBar"
import { Form } from "@/components/ui/Form"
import type { CommonProps } from "@/@types/common"
import DetailsForm from "./DetailsForm"
import { set } from "lodash"


const validationSchema = z.object({
  employee_number: z.string().min(1, "Employee number is required"),
  employee_name: z.string().nullable(),
  company: z.string().nullable(),
  payroll: z.string().nullable(),
  currency: z.string().nullable(),
})


export type DetailsSchema = z.infer<typeof validationSchema>

type DetailsProps = {
  form: UseFormReturn<DetailsSchema>,
  defaultValues?: DetailsSchema
} & CommonProps


const Details = (props: DetailsProps) => {
  const { form, defaultValues = {}, children } = props

  const {
    handleSubmit,
    reset,
    formState: { errors },
    control,
    watch,
    setValue
  } = form

  useEffect(() => {
    if (!isEmpty(defaultValues)) {
      reset(defaultValues)
    }
  }, [defaultValues, reset])

  return (
    <Form
      className="flex w-full h-full"
      containerClassName="flex flex-col w-full justify-between"

    >
      <Container>
        <div className="flex items-center justify-between">
          <div className="gap-4 flex flex-col flex-auto">
            <DetailsForm control={control} errors={errors} data={defaultValues} watch={watch} setValue={setValue} />
          </div>
        </div>

      </Container>
      <BottomStickyBar>{children}</BottomStickyBar>
    </Form>
  )
}

export default Details

