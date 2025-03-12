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
import { EducationDetailsSchema } from './types'
import FormSection from './components/FormSection'

type EducationDetailsProps = {
    onFormSubmit: (values: EducationDetailsSchema) => void
    defaultValues?: EducationDetailsSchema
} & CommonProps

const validationSchema: ZodType<EducationDetailsSchema> = z.object({
    type_of_establishment: z.string().optional(),
    name_of_establishment: z.string().optional(),
    discipline: z.string().optional(),
    passing_year: z.string().optional(),
    grade: z.string().optional(),
    level: z.string().optional(),

    company_sponsored: z.string().optional(),
    amount: z.string().optional(),
    reimbursement_data: z.string().optional(),

    subject: z.string().optional(),
    major_field: z.string().optional(),
    minor_field: z.string().optional(),
    affiliated_to: z.string().optional(),

    address_of_institute: z.string().optional(),
    attended_from: z.string().optional(),
    attended_to: z.string().optional(),
    currency: z.string().optional(),
    explain_breaks_during_education: z.string().optional(),
    employee_number: z.string().optional(),
})

const EducationDetailForm = (props: EducationDetailsProps) => {
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
    } = useForm<EducationDetailsSchema>({
        defaultValues,
        resolver: zodResolver(validationSchema),
    })

    useEffect(() => {
        if (!isEmpty(defaultValues)) {
            reset(defaultValues)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [JSON.stringify(defaultValues)])

    const onSubmit = (values: EducationDetailsSchema) => {
        onFormSubmit?.(values)
    }

    return (
        <Form
            id='educationDetailForm'
            className="flex w-full h-full"
            containerClassName="flex flex-col w-full justify-between"
            onSubmit={handleSubmit(onSubmit)}
        >
            <Container>
                <div className="flex items-center justify-between">
                    <div className="gap-4 flex flex-col flex-auto">
                        <FormSection control={control} errors={errors} data={defaultValues}/>
                    </div>
                </div>
            </Container>
            <BottomStickyBar>{children}</BottomStickyBar>
        </Form>
    )
}

export default EducationDetailForm   