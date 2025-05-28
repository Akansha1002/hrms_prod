import { useEffect, useState } from 'react'
import { Form } from '@/components/ui/Form'
import Card from '@/components/ui/Card'
import Tabs from '@/components/ui/Tabs'
import Container from '@/components/shared/Container'
import BottomStickyBar from '@/components/template/BottomStickyBar'
import isEmpty from 'lodash/isEmpty'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import type { ZodType } from 'zod'
import type { CommonProps } from '@/@types/common'
import useSWR from 'swr'
import { ResignationFormSchema } from './types'
import EmployeeInfoSection from './components/EmployeeInfoSection'
import ResignationInfoSection from './components/ResignationInfoSection'
import PayrollSection from './components/PayrollSection'

const { TabNav, TabList, TabContent } = Tabs

type ResignationFormProps = {
    onFormSubmit: (values: ResignationFormSchema) => void
    defaultValues?: ResignationFormSchema
} & CommonProps

const validationSchema: ZodType<ResignationFormSchema> = z.object({
    //Employee Info
    employee: z.string().min(1, { message: 'Employee is required' }),
    date_of_joining: z.string().optional(),
    designation: z.string().optional(),
    grade: z.string().optional(),
    business_unit: z.string().optional(),
    department: z.string().optional(),
    location: z.string().optional(),
    reporting_manager: z.string().optional(),
    functional_reporting_to: z.string().optional(),
    official_email: z.string().optional(),

    //Resignation Info
    separation_type: z.string().min(1, { message: 'Separation Type is required' }),
    resignation_reason: z.string().min(1, { message: 'Resignation Reason is required' }),
    resignation_letter_date: z.string().optional(),
    request_relieving_date: z.string().optional(),
    actual_relieving_date: z.string().optional(),
    notice_period: z.string().optional(),
    end_of_notice_period: z.string().optional(),
    notice_period_shortfall: z.string().optional(),
    next_employer: z.string().optional(),
    employee_reason: z.string().optional(),
    mailing_address: z.string().optional(),
    other_address: z.string().optional(),
    personal_email_id: z.string().optional(),
    reason_for_do_not_hire: z.string().optional(),

    //Payroll
    last_pay_date: z.string().min(1, { message: 'Last Pay Date is required' }),
    last_working_date: z.string().min(1, { message: 'Last Working Date is required' }),
    salary_hold: z.string().optional(),
    payment_advice: z.string().optional(),
    recover_shortfall: z.string().optional(),
    partial_walve_off_days: z.string().optional(),
    shortfall_period_after_walve_off: z.string().optional(),
    reason_for_walve_off: z.string().optional(),

})

const ResignationForm = (props: ResignationFormProps) => {
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
    } = useForm<ResignationFormSchema>({
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

    const onSubmit = (values: ResignationFormSchema) => {
        onFormSubmit?.(values)
    }

    return (
        <Form
            className="flex w-full h-full"
            containerClassName="flex flex-col w-full justify-between"
            onSubmit={handleSubmit(onSubmit)}
        >
            <Container>
                <Card className="w-full">
                    <Tabs defaultValue="employee" >
                        <TabList>
                            <TabNav value="employee">Employee Details</TabNav>
                            <TabNav value="resignation">Resignation Info</TabNav>
                            <TabNav value="payroll">Payroll</TabNav>
                        </TabList>
                        <div className="p-4">
                            <TabContent value="employee">
                                <EmployeeInfoSection
                                    control={control}
                                    errors={errors}
                                />
                            </TabContent>
                            <TabContent value="resignation">
                                <ResignationInfoSection
                                    control={control}
                                    errors={errors}
                                />
                            </TabContent>
                            <TabContent value="payroll">
                                <PayrollSection
                                    control={control}
                                    errors={errors}
                                />
                            </TabContent>
                        </div>
                    </Tabs>
                </Card>
            </Container>
            <BottomStickyBar>{children}</BottomStickyBar>
        </Form>
    )
}

export default ResignationForm