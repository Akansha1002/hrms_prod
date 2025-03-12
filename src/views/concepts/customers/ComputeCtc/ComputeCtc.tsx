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
import JoiningBonusSection from './components/JoiningBonusSection'
import { ComputeCtcSchema, SalaryData } from './types'
import SalaryTable from './components/SalaryTableSection'
import ComputeCtcDrawer from './components/ComputeCtcDrawer'

type ComputeCtcProps = {
    onFormSubmit: (values: ComputeCtcSchema) => void
    defaultValues?: ComputeCtcSchema
    newCustomer?: boolean
} & CommonProps

const validationSchema: ZodType<ComputeCtcSchema> = z.object({
    joiningBonus: z.string().min(1),
})

const ComputeCtc = (props: ComputeCtcProps) => {
    const {
        onFormSubmit,
        defaultValues = {},
        newCustomer = false,
        children,
    } = props

    const {
        handleSubmit,
        reset,
        formState: { errors },
        control,
    } = useForm<ComputeCtcSchema>({
        // defaultValues: {
        //     ...{
        //         banAccount: false,
        //         accountVerified: true,
        //     },
        //     ...defaultValues,
        // },
        resolver: zodResolver(validationSchema),
    })

    useEffect(() => {
        if (!isEmpty(defaultValues)) {
            reset(defaultValues)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [JSON.stringify(defaultValues)])

    const onSubmit = (values: ComputeCtcSchema) => {
        onFormSubmit?.(values)
    }


    return (
        // <Form
        //     className="flex w-full h-full"
        //     containerClassName="flex flex-col w-full justify-between"
        // >
        //     <Container>
        //         <div className="flex items-center justify-between">
        //             <div className="gap-4 flex flex-col flex-auto">
        //                 <SalaryTable data={salaryData} />
        //                 <JoiningBonusSection control={control} errors={errors} />
        //             </div>
        //         </div>
        //     </Container>
        // </Form>
        <>
            <ComputeCtcDrawer />
        </>
    )
}

export default ComputeCtc   