import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import dayjs from 'dayjs'
import useSWR from 'swr'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import Select from '@/components/ui/Select'
import DatePicker from '@/components/ui/DatePicker'
import { Form, FormItem } from '@/components/ui/Form'
import Checkbox from '@/components/ui/Checkbox/Checkbox'
import { Drawer } from '@/components/ui'
import type { SelectedCell } from '../types'
import { apiGetLeaveTypeList } from '@/services/LeaveService'

const validationSchema = z.object({
    naming_series: z.string().default('HR-LAP-.YYYY.-'),
    leave_type: z.string().min(1, { message: 'Leave type is required' }),
    from_date: z.date({ required_error: 'Please select a date' }),
    to_date: z.date({ required_error: 'Please select a date' }),
    description: z.string().min(1, { message: 'Reason is required' }),
    posting_date: z.date({ required_error: 'Please select a date' }),
    leaveAddress: z.string().optional(),
    phoneNo: z.string().optional(),
    workReassignTo: z.string().optional(),
    employeesToNotify: z.string().optional(),
    half_day: z.boolean().optional().default(false),
})

type FormModel = z.infer<typeof validationSchema>

type LeaveRequestDrawerProps = {
    open: boolean
    selected: SelectedCell
    onDrawerOpen: (open: boolean) => void
    submit: (formData: FormModel) => void
}

const LeaveRequestDrawer = ({ open, selected, onDrawerOpen, submit }: LeaveRequestDrawerProps) => {
    const handleDrawerClose = () => {
        onDrawerOpen(false)
    }

    const onSubmit = (values: FormModel) => {
        submit(values)
        handleDrawerClose()
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

    const { data, isLoading } = useSWR(
        ['/api/resource/Leave Type', {}],
        ([_, params]) => apiGetLeaveTypeList<{ data: { name: string }[] }, Record<string, unknown>>(params),
        {
            revalidateOnFocus: false,
        }
    );

    const leaveTypeList = data?.data?.map((leaveType) => ({
        value: leaveType.name,
        label: leaveType.name,
    })) || [];

    useEffect(() => {
        if (selected) {
            reset({
                naming_series: 'HR-LAP-.YYYY.-',
                leave_type: selected.leave_type || '',
                from_date: selected.from_date ? dayjs(selected.from_date).toDate() : undefined,
                to_date: selected.to_date ? dayjs(selected.to_date).toDate() : undefined,
                description: selected.description || '',
                posting_date: selected.to_date ? dayjs(selected.posting_date).toDate() : dayjs().toDate(),
                leaveAddress: selected.leaveAddress || '',
                phoneNo: selected.phoneNo || '',
                workReassignTo: selected.workReassignTo || '',
                employeesToNotify: selected.employeesToNotify || '',
                half_day: selected.half_day || false,
            })
        }
    }, [selected, reset])

    return (
        <Drawer
            title='Leave Request'
            isOpen={open}
            onClose={handleDrawerClose}
            onRequestClose={handleDrawerClose}
        >
            <Form
                className="flex-1 flex flex-col overflow-y-auto"
                onSubmit={handleSubmit(onSubmit)}
            >
                <FormItem
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
                </FormItem>
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
                                options={isLoading ? [{ value: '', label: 'Loading...' }] : leaveTypeList}
                                value={leaveTypeList.find(option => option.value === field.value) || null}
                                onChange={(option) => field.onChange(option ? option.value : '')}
                            />
                        }
                    />
                </FormItem>
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
                <FormItem
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
                </FormItem>
                <FormItem
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
                </FormItem>
                <FormItem
                    label="Work Reassign To"
                    invalid={!!errors.workReassignTo}
                    errorMessage={errors.workReassignTo?.message}
                >
                    <Controller
                        name="workReassignTo"
                        control={control}
                        render={({ field }) =>
                            <Input {...field}
                            />
                        }
                    />
                </FormItem>
                <FormItem
                    label="Employees to be Notified"
                    invalid={!!errors.employeesToNotify}
                    errorMessage={errors.employeesToNotify?.message}
                >
                    <Controller
                        name="employeesToNotify"
                        control={control}
                        render={({ field }) =>
                            <Input {...field}
                            />
                        }
                    />
                </FormItem>
                <FormItem className="mb-0 text-right rtl:text-left">
                    <Button block variant="solid" type="submit">
                        Submit
                    </Button>
                </FormItem>
            </Form>
        </Drawer>
    )
}

export default LeaveRequestDrawer
