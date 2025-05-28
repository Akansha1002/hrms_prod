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
import { Drawer } from '@/components/ui'
import { SelectedCell } from '../types'

const statusOptions = [
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
]

const validationSchema = z.object({
    holidayReason: z.string().min(1, { message: 'Holiday reason is required' }),
    holidayDescription: z.string().min(1, { message: 'Holiday description is required' }),
    holidayDate: z.date({ required_error: 'Please select a holiday date' }),
    status: z.string().min(1, { message: 'Status is required' }),
    compensationDate: z.date({ required_error: 'Please select a compensation date' }),
})

type FormModel = z.infer<typeof validationSchema>

type HolidayEditDrawerProps = {
    open: boolean
    selected: SelectedCell
    onDrawerOpen: (open: boolean) => void
    submit: (formData: FormModel) => void
}

const HolidayEditDrawer = ({ open, selected, onDrawerOpen, submit }: HolidayEditDrawerProps) => {
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

    // useEffect(() => {
    //     if (selected) {
    //         reset({
    //             holidayReason: selected.holidayReason || '',
    //             holidayDescription: selected.holidayDescription || '',
    //             holidayDate: selected.holidayDate ? dayjs(selected.holidayDate).toDate() : undefined,
    //             status: selected.status || '',
    //             compensationDate: selected.compensationDate ? dayjs(selected.compensationDate).toDate() : undefined,
    //         })
    //     }
    // }, [selected, reset])

    return (
        <Drawer
            title='Holiday'
            isOpen={open}
            onClose={handleDrawerClose}
            onRequestClose={handleDrawerClose}
        >
            <Form
                className="flex-1 flex flex-col overflow-y-auto"
                onSubmit={handleSubmit(onSubmit)}
            >
                <FormItem
                    label="Holiday Reason"
                    invalid={!!errors.holidayReason}
                    errorMessage={errors.holidayReason?.message}
                >
                    <Controller
                        name="holidayReason"
                        control={control}
                        render={({ field }) => <Input {...field} />}
                    />
                </FormItem>

                <FormItem
                    label="Holiday Description"
                    invalid={!!errors.holidayDescription}
                    errorMessage={errors.holidayDescription?.message}
                >
                    <Controller
                        name="holidayDescription"
                        control={control}
                        render={({ field }) => <Input {...field} />}
                    />
                </FormItem>

                <FormItem
                    label="Holiday Date"
                    invalid={!!errors.holidayDate}
                    errorMessage={errors.holidayDate?.message}
                >
                    <Controller
                        name="holidayDate"
                        control={control}
                        render={({ field }) => <DatePicker {...field} />}
                    />
                </FormItem>

                <FormItem
                    label="Status"
                    invalid={!!errors.status}
                    errorMessage={errors.status?.message}
                >
                    <Controller
                        name="status"
                        control={control}
                        render={({ field }) => <Select options={statusOptions} {...field} />}
                    />
                </FormItem>

                <FormItem
                    label="Compensation Date"
                    invalid={!!errors.compensationDate}
                    errorMessage={errors.compensationDate?.message}
                >
                    <Controller
                        name="compensationDate"
                        control={control}
                        render={({ field }) => <DatePicker {...field} />}
                    />
                </FormItem>
                <div className='flex justify-end gap-4'>
                    <FormItem className="mb-0 text-right rtl:text-left flex gap-4">
                        <Button block variant="default" type="button" onClick={() => reset()}>
                            Reset
                        </Button>
                    </FormItem>
                    <FormItem className="mb-0 text-right rtl:text-left flex gap-4">
                        <Button block variant="solid" type="submit">
                            Submit
                        </Button>
                    </FormItem>
                </div>
            </Form>
        </Drawer>
    )
}

export default HolidayEditDrawer