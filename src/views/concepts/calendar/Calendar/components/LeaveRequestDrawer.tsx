import { useEffect } from 'react'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import Select from '@/components/ui/Select'
import DatePicker from '@/components/ui/DatePicker'
import { Form, FormItem } from '@/components/ui/Form'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import dayjs from 'dayjs'
import type { SelectedCell } from '../types'
import { Drawer } from '@/components/ui'

const leaveTypes = [
    { value: 'leave', label: 'LV - Leave' },
    { value: 'lossOfPay', label: 'LOP - Loss Of Pay' },
    { value: 'optionalHoliday', label: 'OP-HO - Optional Holiday' },
]

const shifts = [
    { value: 'morning', label: 'Morning' },
    { value: 'afternoon', label: 'Afternoon' },
    { value: 'night', label: 'Night' },
]

const validationSchema = z.object({
    leaveType: z.string().min(1, { message: 'Leave type is required' }),
    fromDate: z.date({ required_error: 'Please select a date' }),
    shift: z.string().min(1, { message: 'Shift is required' }),
    toDate: z.date({ required_error: 'Please select a date' }),
    reason: z.string().min(1, { message: 'Reason is required' }),
    leaveAddress: z.string().min(1, { message: 'Leave address is required' }),
    phoneNo: z.string().min(10, { message: 'Enter a valid phone number' }),
    workReassignTo: z.string().min(1, { message: 'Required' }),
    employeesToNotify: z.string().min(1, { message: 'Required' }),
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
    })

    useEffect(() => {
        if (selected) {
            reset({
                leaveType: selected.leaveType || '',
                fromDate: selected.fromDate ? dayjs(selected.fromDate).toDate() : undefined,
                shift: selected.shift || '',
                toDate: selected.toDate ? dayjs(selected.toDate).toDate() : undefined,
                reason: selected.reason || '',
                leaveAddress: selected.leaveAddress || '',
                phoneNo: selected.phoneNo || '',
                workReassignTo: selected.workReassignTo || '',
                employeesToNotify: selected.employeesToNotify || '',
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
                    label="Leave Type"
                    invalid={!!errors.leaveType}
                    errorMessage={errors.leaveType?.message}
                >
                    <Controller
                        name="leaveType"
                        control={control}
                        render={({ field }) =>
                            <Select
                                options={leaveTypes}
                                {...field}
                            />
                        }
                    />
                </FormItem>
                <div className='flex gap-4'>
                    <FormItem
                        label="From Date"
                        invalid={!!errors.fromDate}
                        errorMessage={errors.fromDate?.message}
                    >
                        <Controller
                            name="fromDate"
                            control={control}
                            render={({ field }) =>
                                <DatePicker {...field}
                                />
                            }
                        />
                    </FormItem>
                    <FormItem
                        label="Shift"
                        invalid={!!errors.shift}
                        errorMessage={errors.shift?.message}
                    >
                        <Controller
                            name="shift"
                            control={control}
                            render={({ field }) =>
                                <Select
                                    options={shifts}
                                    {...field}
                                />
                            }
                        />
                    </FormItem>
                </div>
                <FormItem
                    label="To Date"
                    invalid={!!errors.toDate}
                    errorMessage={errors.toDate?.message}
                >
                    <Controller
                        name="toDate"
                        control={control}
                        render={({ field }) =>
                            <DatePicker {...field}
                            />
                        }
                    />
                </FormItem>
                <FormItem
                    label="Reason"
                    invalid={!!errors.reason}
                    errorMessage={errors.reason?.message}
                >
                    <Controller
                        name="reason"
                        control={control}
                        render={({ field }) =>
                            <Input {...field}
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
