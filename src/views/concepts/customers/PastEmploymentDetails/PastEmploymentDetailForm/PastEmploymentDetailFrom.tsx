import { useEffect } from 'react'
import { Form } from '@/components/ui/Form'
import Container from '@/components/shared/Container'
import BottomStickyBar from '@/components/template/BottomStickyBar'
import isEmpty from 'lodash/isEmpty'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import type { ZodType } from 'zod'
import type { CommonProps } from '@/@types/common'
import { PastEmploymentDetailsSchema } from './types'
import EmploymentDetails from './components/EmploymentDetailSection'
type PastEmploymentDetailsProps = {
    onFormSubmit: (values: PastEmploymentDetailsSchema) => void
    defaultValues?: PastEmploymentDetailsSchema
} & CommonProps

const validationSchema: ZodType<PastEmploymentDetailsSchema> = z.object({
    employee_number: z.string().optional(),
    company_name: z.string().min(1, { message: "Company name required" }),
    from_date: z.string().min(1, { message: "Start date required" }),
    to_date: z.string().min(1, { message: "End date required" }),
    job_title: z.string().min(1, { message: "Job title required" }),
    salary_on_leaving: z.string().optional(),
    contact_number: z.string().optional(),
    roles: z.string().optional(),
    breaks_in_career: z.string().optional(),
    address: z.string().optional(),
    designation_on_joining: z.string().optional(),
    designation_on_leaving: z.string().optional(),
    number_of_people_reporting: z.string().optional(),
    industry_type: z.string().optional(),
    key_experience: z.string().optional(),
    reason_for_leaving: z.string().optional(),
    number_of_months_experience: z.string().optional(),
})

const PastEmploymentDetailForm = (props: PastEmploymentDetailsProps) => {
    const {
        onFormSubmit,
        defaultValues = {},
        children,
    } = props

    const {
        handleSubmit,
        reset,
        formState: { errors },
        control,
    } = useForm<PastEmploymentDetailsSchema>({
        defaultValues,
        resolver: zodResolver(validationSchema),
    })

    useEffect(() => {
        if (!isEmpty(defaultValues)) {
            reset(defaultValues)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [JSON.stringify(defaultValues)])

    const onSubmit = (values: PastEmploymentDetailsSchema) => {
        onFormSubmit?.(values)
    }


    return (
        <Form
            className="flex w-full h-full"
            containerClassName="flex flex-col w-full justify-between"
            onSubmit={handleSubmit(onSubmit)}
        >
            <Container>
                <div className="flex items-center justify-between">
                    <div className="gap-4 flex flex-col flex-auto">
                        <EmploymentDetails control={control} errors={errors} data={defaultValues} />
                    </div>
                </div>
            </Container>
            <BottomStickyBar>{children}</BottomStickyBar>
        </Form>
    )
}

export default PastEmploymentDetailForm  
