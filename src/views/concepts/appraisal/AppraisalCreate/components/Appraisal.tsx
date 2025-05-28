import { useEffect, useState } from 'react'

import { Control, UseFormReturn } from 'react-hook-form'

import isEmpty from 'lodash/isEmpty'

import Container from '@/components/shared/Container'

import { Form } from '@/components/ui/Form'
import type { CommonProps } from '@/@types/common'

import { AppraisalSchema } from '../AppraisalCreate'
import Tabs from '@/components/ui/Tabs'
import Overview from './Overview'
import { KRAs } from './KRAs'
import { s } from '@fullcalendar/core/internal-common'
import RatingsTable from './RatingsTable'

const { TabNav, TabList, TabContent } = Tabs

type AppraisalProps = {
    form: UseFormReturn<AppraisalSchema>
    defaultValues?: AppraisalSchema
    kraTableRows?: any[]
    ratingTableRows?: any[]
    setKraTableRows?: any
    setRatingTableRows?: any
} & CommonProps

export type AppraisalFormProps = {
    control: Control<AppraisalSchema>
    errors: Record<string, any>
    data?: Partial<AppraisalSchema>
    watch?: any
    setValue?: any
    table?: any
    setTable?: any
    ratingTable?: any
    setRatingTable?: any
}
const Appraisal = (props: AppraisalProps) => {
    const {
        form,
        defaultValues = {},
        kraTableRows,
        ratingTableRows,
        setKraTableRows,
        setRatingTableRows,
    } = props

    const [activeTab, setActiveTab] = useState('tab1')

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
                    <Tabs
                        value={activeTab}
                        onChange={setActiveTab}
                        defaultValue="tab1"
                    >
                        <TabList>
                            <TabNav value="tab1">Overview</TabNav>
                            <TabNav value="tab2">KRAs</TabNav>
                            <TabNav value="tab3">Feedback</TabNav>
                            <TabNav value="tab4">Self Appraisal</TabNav>
                        </TabList>
                        <div className="p-4">
                            <TabContent value="tab1">
                                <Overview
                                    control={control}
                                    errors={errors}
                                    data={defaultValues}
                                    watch={watch}
                                    setValue={setValue}
                                />
                            </TabContent>
                            <TabContent value="tab2">
                                <KRAs
                                    control={control}
                                    errors={errors}
                                    data={defaultValues}
                                    watch={watch}
                                    setValue={setValue}
                                    table={kraTableRows}
                                    setTable={setKraTableRows}
                                    ratingTable={ratingTableRows}
                                    setRatingTable={setRatingTableRows}
                                />
                            </TabContent>
                            <TabContent value="tab3"></TabContent>
                            <TabContent value="tab4">
                                <RatingsTable
                                    key={watch('appraisalTemplate')}
                                    data={ratingTableRows as any}
                                    setData={setRatingTableRows}
                                    control={control}
                                    errors={errors}
                                    formdata={defaultValues}
                                    watch={watch}
                                />
                            </TabContent>
                        </div>
                    </Tabs>
                </Container>
            </Form>
        </div>
    )
}

export default Appraisal
