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
import { AllocatedLeaveTableData, LeaveApplicationFormSchema } from './types'
import LeaveInfoSection from './components/LeaveInfoSection'
import ReasonSection from './components/ReasonSection'
import ApprovalSection from './components/ApprovalSection'
import AllocatedLeaveTable from './components/AllocatedLeaveTable'
import { apiGetLeaveTypeList } from '@/services/LeaveService'
import { apiGetEmployeeNameList } from '@/services/HolidayService'
import useSWR from 'swr'

type LeaveApplicationFormProps = {
    onFormSubmit: (values: LeaveApplicationFormSchema) => void
    defaultValues?: LeaveApplicationFormSchema
    leaveAllocationList?: AllocatedLeaveTableData[]
} & CommonProps

const validationSchema: ZodType<LeaveApplicationFormSchema> = z.object({
    employee: z.string().min(1, { message: 'employee is required' }),
    employee_name: z.string().optional(),
    leave_type: z.string().optional(),
    company: z.string().optional(),
    // department: z.string().optional(),

    from_date: z.string().optional(),
    to_date: z.string().optional(),
    // half_day: z.boolean().optional().default(false),
    // total_leave_days: z.string().optional(),
    description: z.string().optional(),

    leave_approver: z.string().optional(),
    posting_date: z.string().optional(),
    custom_work_reassign_to: z.string().optional(),
    custom_employees_to_be_notified: z.string().optional(),
    status: z.string().optional(),
})
const LeaveApplicationForm = (props: LeaveApplicationFormProps) => {
    const {
        onFormSubmit,
        defaultValues = {},
        leaveAllocationList = [],
        children,
    } = props

    const {
        handleSubmit,
        reset,
        formState: { errors },
        control,
    } = useForm<LeaveApplicationFormSchema>({
        defaultValues,
        resolver: zodResolver(validationSchema),
    })

    useEffect(() => {
        if (!isEmpty(defaultValues)) {
            reset(defaultValues)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [JSON.stringify(defaultValues)])

    const onSubmit = (values: LeaveApplicationFormSchema) => {
        onFormSubmit?.(values)
    }

    const { data, isLoading, } = useSWR(
        'fetch-all-data',
        async () => {
            const [leaveTypeRes, employeeNameRes] = await Promise.all([
                apiGetLeaveTypeList<{ data: { name: string }[] }, Record<string, unknown>>({}),
                apiGetEmployeeNameList<{ data: { name: string; employee_name: string }[] }, Record<string, unknown>>({}),
            ]);

            return {
                leaveTypeList: leaveTypeRes?.data || [],
                employeeNameList: employeeNameRes?.data || [],
            };
        },
        { revalidateOnFocus: false },
    )

    const leaveTypeList =
        data?.leaveTypeList.map((leaveType) => ({
            value: leaveType.name,
            label: leaveType.name,
        })) || []

    const employeeNameList =
        data?.employeeNameList.map((employeeName) => ({
            value: employeeName.name,
            label: `${employeeName.employee_name} (${employeeName.name})`,
        })) || []

    return (
        <Form
            className="flex w-full h-full"
            containerClassName="flex flex-col w-full justify-between"
            onSubmit={handleSubmit(onSubmit)}
        >
            <Container>
                <div className="flex items-center justify-between">
                    <div className="gap-4 flex flex-col flex-auto">
                        <AllocatedLeaveTable
                            data={leaveAllocationList || []}
                        />
                        <LeaveInfoSection
                            control={control}
                            errors={errors}
                            leaveTypeList={leaveTypeList}
                            isLoading={isLoading}
                        />
                        <ReasonSection control={control} errors={errors} />
                        <ApprovalSection
                            control={control}
                            errors={errors}
                            employeeNameList={employeeNameList}
                            isLoading={isLoading}
                        />
                    </div>
                </div>
            </Container>
            <BottomStickyBar>{children}</BottomStickyBar>
        </Form>
    )
}

export default LeaveApplicationForm