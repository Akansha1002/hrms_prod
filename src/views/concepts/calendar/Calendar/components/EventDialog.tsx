import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import dayjs from 'dayjs'
import useSWR from 'swr'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import Select from '@/components/ui/Select'
import DatePicker from '@/components/ui/DatePicker'
import Dialog from '@/components/ui/Dialog'
import { Form, FormItem } from '@/components/ui/Form'
import Checkbox from '@/components/ui/Checkbox/Checkbox'
import type { SelectedCell } from '../types'
import ScrollBar from '@/components/ui/ScrollBar'
import classNames from '@/utils/classNames'
import { apiGetLeaveAllocations, apiGetLeaveTypeList } from '@/services/LeaveService'
import { apiGetEmployeeNameList } from '@/services/HolidayService'

type EventDialogProps = {
    open: boolean
    selected: SelectedCell
    onDialogOpen: (open: boolean) => void
    submit: (formData: FormModel) => void
    employeeId: string
}

const validationSchema = z.object({
    naming_series: z.string().default('HR-LAP-.YYYY.-'),
    leave_type: z.string().min(1, { message: 'Leave type is required' }),
    from_date: z.date({ required_error: 'Please select a date' }),
    to_date: z.date({ required_error: 'Please select a date' }),
    description: z.string().min(1, { message: 'Reason is required' }),
    posting_date: z.date({ required_error: 'Please select a date' }),
    leaveAddress: z.string().optional(),
    phoneNo: z.string().optional(),
    custom_work_reassign_to: z.string().optional(),
    custom_employees_to_be_notified: z.string().optional(),
    half_day: z.boolean().optional().default(false),
    message: z.string().optional(),
})

type FormModel = z.infer<typeof validationSchema>

const EventDialog = (props: EventDialogProps) => {
    const { submit, open, selected, onDialogOpen, employeeId } = props

    const handleDialogClose = () => {
        onDialogOpen(false)
    }

    const onSubmit = (values: FormModel) => {
        submit(values)
        handleDialogClose()
    }

    const {
        handleSubmit,
        reset,
        formState: { errors },
        control,
    } = useForm<FormModel>({
        resolver: zodResolver(validationSchema),
        defaultValues: {
            naming_series: 'HR-LAP-.YYYY.-',
            half_day: false,
        },
    })

    // const { data, isLoading } = useSWR(
    //     ['/api/resource/Leave Type', {}],
    //     ([_, params]) => apiGetLeaveTypeList<{ data: { name: string }[] }, Record<string, unknown>>(params),
    //     {
    //         revalidateOnFocus: false,
    //     }
    // );

    // const leaveTypeList = data?.data?.map((leaveType) => ({
    //     value: leaveType.name,
    //     label: leaveType.name,
    // })) || [];

    // const { data, error, isLoading, mutate } = useSWR(
    //     'fetch-all-data',
    //     async () => {
    //         const [leaveTypeRes, employeeNameRes] = await Promise.all([
    //             // apiGetLeaveTypeList<{ data: { name: string }[] }, Record<string, unknown>>({}),
    //             apiGetLeaveAllocations<{ data: { name: string, total_leaves_allocated: number }[] }, Record<string, unknown>>({}),
    //             apiGetEmployeeNameList<{ data: { name: string; employee_name: string }[] }, Record<string, unknown>>({}),
    //         ]);

    //         return {
    //             leaveTypeList: leaveTypeRes?.data || [],
    //             employeeNameList: employeeNameRes?.data || [],
    //         };
    //     },
    //     { revalidateOnFocus: false },
    // )

    const { data: leaveAllocationsData, error: leaveError, isLoading: isLeaveLoading } = useSWR(
        employeeId ? ['leave-allocations', employeeId] : null,
        ([_, empId]) =>
            apiGetLeaveAllocations<{
                data: { leave_type: string; total_leaves_allocated: number }[]
            }, { employee: string }>({ employee: empId }),
        { revalidateOnFocus: false }
    )

    const leaveTypeList =
        leaveAllocationsData?.data.map((leave) => ({
            value: leave.leave_type,
            label: leave.leave_type,
            totalAllocated: leave.total_leaves_allocated ?? 0
        })) || []

    const [totalAllocatedLeave, setTotalAllocatedLeave] = useState<number | null>(null)

    const { data: employeeData, error: employeeError, isLoading: isEmployeeLoading } = useSWR(
        'employee-name-list',
        () =>
            apiGetEmployeeNameList<{
                data: { name: string; employee_name: string }[]
            }, Record<string, unknown>>({}),
        { revalidateOnFocus: false }
    )

    const employeeNameList =
        employeeData?.data.map((employeeName) => ({
            value: employeeName.name,
            label: `${employeeName.employee_name} (${employeeName.name})`,
        })) || []


    useEffect(() => {
        if (selected) {
            reset({
                naming_series: 'HR-LAP-.YYYY.-',
                leave_type: selected.leave_type || '',
                from_date: selected.from_date ? dayjs(selected.from_date).toDate() : undefined,
                to_date: selected.to_date ? dayjs(selected.to_date).toDate() : undefined,
                description: selected.description || '',
                posting_date: selected.posting_date ? dayjs(selected.posting_date).toDate() : dayjs().toDate(),
                leaveAddress: selected.leaveAddress || '',
                phoneNo: selected.phoneNo || '',
                custom_work_reassign_to: selected.custom_work_reassign_to || '',
                custom_employees_to_be_notified: selected.custom_employees_to_be_notified || '',
                half_day: selected.half_day || false,
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selected, reset])

    return (
        <Dialog
            isOpen={open}
            height={560}
            bodyOpenClassName="overflow-hidden"
            onClose={handleDialogClose}
            onRequestClose={handleDialogClose}
        >
            <h5 className="mb-4">Leave Request</h5>
            <Form
                className="flex-1 flex flex-col"
                onSubmit={handleSubmit(onSubmit)}
            >
                <div className='mt-4'>
                    <div className='mb-6'>
                        <ScrollBar
                            className={classNames('overflow-y-auto h-96')}
                        >
                            {/* <FormItem
                                label="Naming Series"
                            >
                                <Controller
                                    name="naming_series"
                                    control={control}
                                    render={({ field }) => (
                                        <Input
                                            {...field}
                                            disabled
                                        />
                                    )}
                                />
                            </FormItem> */}
                            <FormItem
                                label="Leave Type"
                                invalid={!!errors.leave_type}
                                errorMessage={errors.leave_type?.message}
                            >
                                <Controller
                                    name="leave_type"
                                    control={control}
                                    render={({ field }) =>
                                        <Select
                                            options={isLeaveLoading ? [{ value: '', label: 'Loading...' }] : leaveTypeList}
                                            value={leaveTypeList.find(option => option.value === field.value) || null}
                                            onChange={(option) => {
                                                field.onChange(option ? option.value : '')
                                                setTotalAllocatedLeave(option?.totalAllocated ?? null)
                                            }}
                                        />
                                    }
                                />
                            </FormItem>

                            {totalAllocatedLeave !== null && (
                                <div className="text-sm text-gray-600 mb-2">
                                    <strong>Total Leave Allocated:</strong> {totalAllocatedLeave}
                                </div>
                            )}

                            <FormItem
                                label="From Date"
                                invalid={!!errors.from_date}
                                errorMessage={errors.from_date?.message}
                            >
                                <Controller
                                    name="from_date"
                                    control={control}
                                    render={({ field }) =>
                                        <DatePicker {...field}
                                        />
                                    }
                                />
                            </FormItem>
                            <FormItem
                                label="To Date"
                                invalid={!!errors.to_date}
                                errorMessage={errors.to_date?.message}
                            >
                                <Controller
                                    name="to_date"
                                    control={control}
                                    render={({ field }) =>
                                        <DatePicker {...field}
                                        />
                                    }
                                />
                            </FormItem>
                            <FormItem>
                                <Controller
                                    name="half_day"
                                    control={control}
                                    render={({ field: { value, onChange } }) =>
                                        <Checkbox
                                            checked={value}
                                            onChange={onChange}
                                        >
                                            Half Day
                                        </Checkbox>
                                    }
                                />
                            </FormItem>
                            <FormItem
                                label="Reason"
                                invalid={!!errors.description}
                                errorMessage={errors.description?.message}
                            >
                                <Controller
                                    name="description"
                                    control={control}
                                    render={({ field }) =>
                                        <Input {...field}
                                        />
                                    }
                                />
                            </FormItem>
                            <FormItem
                                label="Posting Date"
                                invalid={!!errors.posting_date}
                                errorMessage={errors.posting_date?.message}
                            >
                                <Controller
                                    name="posting_date"
                                    control={control}
                                    render={({ field }) =>
                                        <DatePicker {...field}
                                        />
                                    }
                                />
                            </FormItem>
                            {/* <FormItem
                                label="Leave Address"
                                invalid={!!errors.leaveAddress}
                                errorMessage={errors.leaveAddress?.message}
                            >
                                <Controller
                                    name="leaveAddress"
                                    control={control}
                                    render={({ field }) =>
                                        <Input {...field}
                                        />
                                    }
                                />
                            </FormItem> */}
                            {/* <FormItem
                                label="Phone No"
                                invalid={!!errors.phoneNo}
                                errorMessage={errors.phoneNo?.message}
                            >
                                <Controller
                                    name="phoneNo"
                                    control={control}
                                    render={({ field }) =>
                                        <Input
                                            type="tel"
                                            {...field}
                                        />
                                    }
                                />
                            </FormItem> */}
                            {/* <FormItem
                                label="Work Reassign To"
                                invalid={!!errors.custom_work_reassign_to}
                                errorMessage={errors.custom_work_reassign_to?.message}
                            >
                                <Controller
                                    name="custom_work_reassign_to"
                                    control={control}
                                    render={({ field }) =>
                                        <Select
                                            options={
                                                isEmployeeLoading
                                                    ? [{ value: '', label: 'Loading...' }]
                                                    : employeeNameList
                                            }
                                            value={
                                                employeeNameList.find(
                                                    (option) =>
                                                        option.value === field.value,
                                                ) || null
                                            }
                                            onChange={(option) =>
                                                field.onChange(option ? option.value : '')
                                            }
                                        />
                                    }
                                />
                            </FormItem>
                            <FormItem
                                label="Employees to be Notified"
                                invalid={!!errors.custom_employees_to_be_notified}
                                errorMessage={errors.custom_employees_to_be_notified?.message}
                            >
                                <Controller
                                    name="custom_employees_to_be_notified"
                                    control={control}
                                    render={({ field }) =>
                                        <Select
                                            options={
                                                isEmployeeLoading
                                                    ? [{ value: '', label: 'Loading...' }]
                                                    : employeeNameList
                                            }
                                            value={
                                                employeeNameList.find(
                                                    (option) =>
                                                        option.value === field.value,
                                                ) || null
                                            }
                                            onChange={(option) =>
                                                field.onChange(option ? option.value : '')
                                            }
                                        />
                                    }
                                />
                            </FormItem> */}
                            <FormItem
                                label="Message"
                                invalid={!!errors.message}
                                errorMessage={errors.message?.message}
                            >
                                <Controller
                                    name="message"
                                    control={control}
                                    render={({ field }) =>
                                        <Input {...field}
                                        />
                                    }
                                />
                            </FormItem>
                        </ScrollBar>
                    </div>
                </div>
                <FormItem className="mb-0 text-right rtl:text-left">
                    <Button block variant="solid" type="submit">
                        Submit
                    </Button>
                </FormItem>
            </Form>
        </Dialog>
    )
}

export default EventDialog
