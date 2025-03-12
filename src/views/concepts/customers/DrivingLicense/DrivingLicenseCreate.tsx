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
import { DrivingLicenseSchema } from './types'
import DrivingLicenseForm from './DrivingLicenseForm'

type DrivingLicenseProps = {
    onFormSubmit: (values: DrivingLicenseSchema) => void
    defaultValues?: DrivingLicenseSchema
} & CommonProps

const validationSchema: ZodType<DrivingLicenseSchema> = z.object({
    name_as_in_driving_license: z.string().optional().nullable(),
    driving_license_number: z.string().min(1, { message: "Driving license number is required" }),
    place_of_issue: z.string().optional().nullable(),
    issue_date: z.string().min(1, { message: "Issue date is required" }),
    valid_till: z.string().min(1, { message: "Valid till date is required" }),
})
const DrivingLicenseEdit = (props: DrivingLicenseProps) => {
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
    } = useForm<DrivingLicenseSchema>({
        defaultValues,
        resolver: zodResolver(validationSchema),
    })

    useEffect(() => {
        if (!isEmpty(defaultValues)) {
            reset(defaultValues)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [JSON.stringify(defaultValues)])

    const onSubmit = (values: DrivingLicenseSchema) => {
        onFormSubmit?.(values)
    }
    return (
        <Form
            id='drivingLicenseForm'
            className="flex w-full h-full"
            containerClassName="flex flex-col w-full justify-between"
            onSubmit={handleSubmit(onSubmit)}
        >
            <Container>
                <div className="flex items-center justify-between">
                    <div className="gap-4 flex flex-col flex-auto">
                        <DrivingLicenseForm control={control} errors={errors} data={defaultValues} />
                    </div>
                </div>
            </Container>
            <BottomStickyBar>{children}</BottomStickyBar>
        </Form>
    )
}

export default DrivingLicenseEdit