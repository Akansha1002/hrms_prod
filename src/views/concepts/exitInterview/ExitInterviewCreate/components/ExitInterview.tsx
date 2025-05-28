import { useEffect } from 'react'

import { UseFormReturn } from 'react-hook-form'

import isEmpty from 'lodash/isEmpty'

import Container from '@/components/shared/Container'
import BottomStickyBar from '@/components/template/BottomStickyBar'
import { Form } from '@/components/ui/Form'
import type { CommonProps } from '@/@types/common'

import Card from '@/components/ui/Card'
import { ExitInterviewSchema } from '../ExitInterviewCreate'
import ExitInterviewForm from './ExitInterviewForm'

type DetailsProps = {
    form: UseFormReturn<ExitInterviewSchema>
    defaultValues?: ExitInterviewSchema
} & CommonProps

const ExitInterview = (props: DetailsProps) => {
    const { form, defaultValues = {}, children } = props

    const {
        reset,
        formState: { errors },
        control,
        watch,
        setValue,
    } = form

    useEffect(() => {
        if (!isEmpty(defaultValues)) {
            reset(defaultValues)
        }
    }, [defaultValues, reset])

    return (
        <div>
            <Form
                className="flex w-full h-full"
                containerClassName="flex flex-col w-full justify-between"
            >
                <Container>
                    <div className="flex items-center justify-between">
                        <div className="gap-4 flex flex-col flex-auto">
                            <ExitInterviewForm
                                control={control}
                                errors={errors}
                                data={defaultValues}
                                watch={watch}
                                setValue={setValue}
                            />
                        </div>
                    </div>
                </Container>
            </Form>
        </div>
    )
}

export default ExitInterview
