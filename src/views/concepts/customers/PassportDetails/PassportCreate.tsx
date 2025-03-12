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
import { PassportDetailsSchema } from './types'
import PassportForm from './PassportForm'

type PassportDetailsProps = {
    onFormSubmit: (values: PassportDetailsSchema) => void
    defaultValues?: PassportDetailsSchema
} & CommonProps

const validationSchema: ZodType<PassportDetailsSchema> = z.object({
    name_as_in_passport: z.string().min(1, { message: 'Name is required' }),
    passport_number: z.string().min(1, { message: 'Passport number is required' }),
    place_of_issue: z.string().optional().nullable(),
    issue_date: z.string().optional().nullable(),
    expiry_renewal_date: z.string().optional().nullable(),
    ecnr_required: z.string().optional().nullable(),
    date_of_birth: z.string().optional().nullable(),
    place_of_birth: z.string().optional().nullable(),
    employee_number: z.string().optional().nullable(),
})

const PassportEdit = (props: PassportDetailsProps) => {
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
    } = useForm<PassportDetailsSchema>({
        defaultValues,
        resolver: zodResolver(validationSchema),
    })

    useEffect(() => {
        if (!isEmpty(defaultValues)) {
            reset(defaultValues)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [JSON.stringify(defaultValues)])

    const onSubmit = (values: PassportDetailsSchema) => {
        onFormSubmit?.(values)
    }

    return (
        <Form
            id='passportForm'
            className="flex w-full h-full"
            containerClassName="flex flex-col w-full justify-between"
            onSubmit={handleSubmit(onSubmit)}
        >
            <Container>
                <div className="flex items-center justify-between">
                    <div className="gap-4 flex flex-col flex-auto">
                        <PassportForm control={control} errors={errors} data={defaultValues} />
                    </div>
                </div>
            </Container>
            <BottomStickyBar>{children}</BottomStickyBar>
        </Form>
    )
}

export default PassportEdit  
