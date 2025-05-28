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
import PermanentAddress from './components/PermanentAddress'
import { ContactDetailsSchema } from './types'
import CurrentAddress from './components/CurrentAddress'
import UpdatePhone from './components/UpdatePhone'

type ContactDetailsProps = {
    onFormSubmit: (values: ContactDetailsSchema) => void
    defaultValues?: ContactDetailsSchema
} & CommonProps

const validationSchema: ZodType<ContactDetailsSchema> = z.object({
    permanent_address_1: z.string().min(1, { message: "Permanent address required" }),
    permanent_address_2: z.string().optional(),
    permanent_address_country: z.string().optional(),
    permanent_address_region: z.string().optional(),
    permanent_address_state: z.string().optional(),
    permanent_address_state_name: z.string().optional(),
    permanent_address_city: z.string().optional(),
    permanent_address_zip_code: z.string().optional(),
    permanent_address_contact_number: z.string().optional(),

    current_address_1: z.string().optional(),
    current_address_2: z.string().optional(),
    current_address_country: z.string().optional(),
    current_address_region: z.string().optional(),
    current_address_state: z.string().optional(),
    current_address_state_name: z.string().optional(),
    current_address_city: z.string().optional(),
    current_address_zip_code: z.string().optional(),
    current_address_contact_number: z.string().optional(),

    home_telephone: z.string().optional(),
    extension_number: z.string().optional(),
    // personal_email: z.string().email({ message: "Invalid email" }).optional(),
    personal_email: z.string().optional(),
    work_mobile_number: z.string().optional(),
    preferred_email_language: z.string().optional(),
    personal_mobile_number: z.string().optional(),
    work_telephone: z.string().optional(),
    work_email: z.string().optional(),
    // work_email: z.string().email({ message: "Invalid email" }).optional(),
    // fax_number: z.string().optional()
})

const ContactDetailEdit = (props: ContactDetailsProps) => {
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
    } = useForm<ContactDetailsSchema>({
        defaultValues,
        resolver: zodResolver(validationSchema),
    })

    useEffect(() => {
        if (!isEmpty(defaultValues)) {
            reset(defaultValues)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [JSON.stringify(defaultValues)])

    const onSubmit = (values: ContactDetailsSchema) => {
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
                        <PermanentAddress control={control} errors={errors} data={defaultValues} />
                        <CurrentAddress control={control} errors={errors} data={defaultValues} />
                        <UpdatePhone control={control} errors={errors} data={defaultValues} />
                    </div>
                </div>
            </Container>
            <BottomStickyBar>{children}</BottomStickyBar>
        </Form>
    )
}

export default ContactDetailEdit
