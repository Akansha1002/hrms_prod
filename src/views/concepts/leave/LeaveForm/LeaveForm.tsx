import { useEffect } from 'react'
import { Form } from '@/components/ui/Form'
import Container from '@/components/shared/Container'
import BottomStickyBar from '@/components/template/BottomStickyBar'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import isEmpty from 'lodash/isEmpty'
import type { ZodType } from 'zod'
import type { CommonProps } from '@/@types/common'
import { LeaveFormSchema } from './types'
import NewLeaveType from './Components/NewLeaveType'
import AdditionalInformation from './Components/AdditionInformation'

type LeaveFormProps = {
    onFormSubmit: (values: LeaveFormSchema) => void
    defaultValues?: LeaveFormSchema
    newProduct?: boolean
} & CommonProps

const validationSchema: ZodType<LeaveFormSchema> = z.object({
    name: z.string().min(1, { message: 'Product name required!' }),
})

const LeaveForm = (props: LeaveFormProps) => {
    const {
        onFormSubmit,
        defaultValues = {
            imgList: [],
        },
        children,
    } = props

    const {
        handleSubmit,
        reset,
        formState: { errors },
        control,
    } = useForm<LeaveFormSchema>({
        defaultValues: {
            ...defaultValues,
        },
        resolver: zodResolver(validationSchema),
    })

    useEffect(() => {
        if (!isEmpty(defaultValues)) {
            reset(defaultValues)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [JSON.stringify(defaultValues)])

    const onSubmit = (values: LeaveFormSchema) => {
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
                        <NewLeaveType control={control} errors={errors} />
                        <AdditionalInformation control={control} errors={errors} />
                    </div>
                </div>
            </Container>
            <BottomStickyBar>{children}</BottomStickyBar>
        </Form>
    )
}

export default LeaveForm
