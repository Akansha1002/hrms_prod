import { useEffect, useState } from 'react'
import { Form } from '@/components/ui/Form'
import Card from '@/components/ui/Card'
import Tabs from '@/components/ui/Tabs'
import Container from '@/components/shared/Container'
import BottomStickyBar from '@/components/template/BottomStickyBar'
import isEmpty from 'lodash/isEmpty'
import { zodResolver } from '@hookform/resolvers/zod'
import { useFieldArray, useForm } from 'react-hook-form'
import { z } from 'zod'
import type { ZodType } from 'zod'
import type { CommonProps } from '@/@types/common'
import useSWR from 'swr'
import PromotionInfoSection from './components/PromotionInfoSection'
import SalaryDetailsSection from './components/SalaryDetailsSection'
import PromotionDetailsTable from './components/PromotionDetailsTable'
import { EmployeePromotionFormSchema, GetPropertyListResponse } from './types'
import { apiGetEmployeeNameList } from '@/services/HolidayService'
import { apiGetPropertyListByEmployeeId } from '@/services/EmployeePromotionService'

type EmployeePromotionFormProps = {
    onFormSubmit: (values: EmployeePromotionFormSchema) => void
    defaultValues?: EmployeePromotionFormSchema
} & CommonProps

const validationSchema: ZodType<EmployeePromotionFormSchema> = z.object({
    //Promotion Info
    employee: z.string().min(1, { message: 'Employee is required' }),
    promotion_date: z.string().min(1, { message: 'Promotion date is required' }),
    company: z.string().optional(),

    //Promotion Details Table
    promotion_details: z.array(
        z.object({
            property: z.string().optional(),
            current: z.string().optional(),
            new: z.string().optional(),
        })
    ),

    //Salary Details
    current_ctc: z.string().optional(),
    revised_ctc: z.string().optional(),
})

const EmployeePromotionForm = (props: EmployeePromotionFormProps) => {

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
    } = useForm<EmployeePromotionFormSchema>({
        defaultValues: {
            ...defaultValues,
            promotion_details: [],
        },
        resolver: zodResolver(validationSchema),
    })

    useEffect(() => {
        if (!isEmpty(defaultValues)) {
            reset(defaultValues)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [JSON.stringify(defaultValues)])

    //Promotion Detail field array
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'promotion_details',
    })

    const [selectedEmployeeId, setSelectedEmployeeId] = useState<string>('')

    const { data, isLoading } = useSWR(
        'fetch-all-data',
        async () => {
            const [employeeRes] = await Promise.all([
                apiGetEmployeeNameList<{ data: { name: string; employee_name: string }[] }, Record<string, unknown>>({}),
            ]);

            return {
                employeeNameList: employeeRes?.data || [],
            };
        },
        { revalidateOnFocus: false },
    )

    const employeeNameList =
        data?.employeeNameList?.map((emp) => ({
            value: emp.name,
            label: `${emp.employee_name} (${emp.name})`,
            name: emp.employee_name,
        })) || []

    const { data: propertyList, isLoading: isLoadingPropertyList } = useSWR(
        selectedEmployeeId ? ['fetch-property-list', { name: selectedEmployeeId }] : null,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        ([_, params]) => apiGetPropertyListByEmployeeId<GetPropertyListResponse, { name: string }>(params),
        {
            revalidateOnFocus: false,
            revalidateIfStale: false,
        },
    )

    const propertyListData = propertyList?.message?.map((list) => ({
        value: list.property,
        label: list.property,
        current: list.current,
    })) || []

    const onSubmit = (values: EmployeePromotionFormSchema) => {
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
                        <PromotionInfoSection
                            control={control}
                            errors={errors}
                            employeeData={employeeNameList}
                            isLoading={isLoading}
                            onEmployeeChange={setSelectedEmployeeId}
                        />
                        <PromotionDetailsTable
                            control={control}
                            fields={fields}
                            append={append}
                            remove={remove}
                            propertyListData={propertyListData}
                            isLoading={isLoadingPropertyList}
                            employeeData={employeeNameList}
                        />
                        <SalaryDetailsSection
                            control={control}
                            errors={errors}
                        />
                    </div>
                </div>
            </Container>
            <BottomStickyBar>{children}</BottomStickyBar>
        </Form>
    )
}

export default EmployeePromotionForm