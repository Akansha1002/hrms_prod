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
import { EmployeeDetailsSchema } from './types'
import EmployeeForm from './components/EmployeeForm'
import GovernmemtData from './components/GovernmentData'

type EmployeeDetailsProps = {
    onFormSubmit: (values: EmployeeDetailsSchema) => void
    defaultValues?: EmployeeDetailsSchema
} & CommonProps

const validationSchema: ZodType<EmployeeDetailsSchema> = z.object({
    // email: z
    //     .string()
    //     .min(1, { message: 'Email required' })
    //     .email({ message: 'Invalid email' }),
    gender: z.string().optional(),
    surname: z.string().optional(),
    first_name: z.string().optional(),
    middle_name: z.string().optional(),
    known_as: z.string().optional(),
    nationality: z.string().optional(),
    language: z.string().optional(),
    blood_group: z.string().optional(),
    rh_factor: z.string().optional(),
    aadhar_number: z.string().regex(/^[2-9]\d{11}$/, "Invalid Aadhaar number.").optional(),
    pan_number: z.string().regex(/^[A-Z]{5}[0-9]{4}[A-Z]$/, "Invalid PAN number").optional().nullable(),
    title: z.string().optional(),
    official_name: z.string().optional(),
    place_of_birth: z.string().optional(),
    state_of_birth: z.string().optional(),
    country_of_birth: z.string().optional(),
    dob: z.string().optional(),
    marital_status: z.string().optional(),
    wedding_date: z.string().optional(),
    physically_challenged: z.string().optional(),
    disability: z.string().optional(),
})

const EmployeeDetailEdit = (props: EmployeeDetailsProps) => {
    const { onFormSubmit, defaultValues = {}, children } = props

    const {
        handleSubmit,
        reset,
        formState: { errors },
        control,
    } = useForm<EmployeeDetailsSchema>({
        defaultValues,
        resolver: zodResolver(validationSchema),
    })

    useEffect(() => {
        if (!isEmpty(defaultValues)) {
            reset(defaultValues)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [JSON.stringify(defaultValues)])

    const onSubmit = (values: EmployeeDetailsSchema) => {
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
                        <EmployeeForm
                            control={control}
                            errors={errors}
                            data={defaultValues}
                        />
                        <GovernmemtData
                            control={control}
                            errors={errors}
                            data={defaultValues}
                        />
                    </div>
                </div>
            </Container>
            <BottomStickyBar>{children}</BottomStickyBar>
        </Form>
    )
}

export default EmployeeDetailEdit
