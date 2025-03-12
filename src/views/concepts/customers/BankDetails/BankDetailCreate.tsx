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
import { BankDetailsSchema } from './types'
import CorporateBank from './components/CorporateBank'
import ComputeCtc from '../ComputeCtc'

type BankDetailsProps = {
    onFormSubmit: (values: BankDetailsSchema) => void
    defaultValues?: BankDetailsSchema
} & CommonProps

const validationSchema: ZodType<BankDetailsSchema> = z.object({
    bank_name: z.string().min(1, { message: 'Bank name is required' }),
    bank_address: z.string().optional().nullable(),
    branch_name: z.string().optional().nullable(),
    // bank_url: z.string().url({ message: 'Invalid URL format' }).optional(),
    bank_url: z.string().optional().nullable(),
    country_of_bank: z.string().optional().nullable(),
    bank_phone_number: z.string().optional().nullable(),
    contact_person: z.string().optional().nullable(),
    account_number: z.string().min(1, { message: 'Account number is required' }),
    account_holder_name: z.string().min(1, { message: 'Account holder name is required' }),
    sort_code: z.string().optional().nullable(),
    swift_code: z.string().optional().nullable(),
    account_type: z.string().min(1, { message: 'Account type is required' }),
    currency: z.string().optional().nullable(),
    salary_account: z.string().optional().nullable(),
    ifs_number: z.string().optional().nullable(),
    // employee_number: z.string().min(1, { message: 'Employee number is required' }),
})

const BankDetailEdit = (props: BankDetailsProps) => {
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
    } = useForm<BankDetailsSchema>({
        defaultValues,
        resolver: zodResolver(validationSchema),
    })

    useEffect(() => {
        if (!isEmpty(defaultValues)) {
            reset(defaultValues)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [JSON.stringify(defaultValues)])

    const onSubmit = (values: BankDetailsSchema) => {
        onFormSubmit?.(values)
    }


    return (
        <Form
            id='bankDetailForm'
            className="flex w-full h-full"
            containerClassName="flex flex-col w-full justify-between"
            onSubmit={handleSubmit(onSubmit)}
        >
            <Container>
                <div className="flex items-center justify-between">
                    <div className="gap-4 flex flex-col flex-auto">
                        <CorporateBank control={control} errors={errors} data={defaultValues} />
                        {/* <ComputeCtc /> */}
                    </div>
                </div>
            </Container>
            <BottomStickyBar>{children}</BottomStickyBar>
        </Form>
    )
}

export default BankDetailEdit 