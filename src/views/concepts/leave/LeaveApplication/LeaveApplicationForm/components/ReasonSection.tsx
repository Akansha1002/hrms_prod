import Card from '@/components/ui/Card'
import Input from '@/components/ui/Input'
import DatePicker from '@/components/ui/DatePicker'
import Checkbox from '@/components/ui/Checkbox/Checkbox'
import { FormItem } from '@/components/ui/Form'
import { Controller } from 'react-hook-form'
import { FormSectionBaseProps } from '../types'

type ReasonSectionProps = FormSectionBaseProps

const ReasonSection = ({ control, errors }: ReasonSectionProps) => {
    return (
        <Card>
            <h4 className="mb-6">Date & Reason</h4>
            <div className="grid md:grid-cols-2 gap-4">
                <FormItem
                    asterisk
                    label="From Date"
                    invalid={!!errors.from_date}
                    errorMessage={errors.from_date?.message}
                >
                    <Controller
                        name="from_date"
                        control={control}
                        render={({ field }) =>
                            <Input
                                type="date"
                                value={field.value ?? ''}
                                onChange={field.onChange}
                                onBlur={field.onBlur}
                            />
                        }
                    />
                </FormItem>
                <FormItem
                    asterisk
                    label="To Date"
                    invalid={!!errors.to_date}
                    errorMessage={errors.to_date?.message}
                >
                    <Controller
                        name="to_date"
                        control={control}
                        render={({ field }) =>
                            <Input
                                type="date"
                                value={field.value ?? ''}
                                onChange={field.onChange}
                                onBlur={field.onBlur}
                            />
                        }
                    />
                </FormItem>
                <div>
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
                        label="Total Leave Days"
                    >
                        <Controller
                            name="total_leave_days"
                            control={control}
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    disabled
                                    placeholder='Total Leave Days'
                                />
                            )}
                        />
                    </FormItem>
                </div>
                <FormItem
                    label="Reason"
                    invalid={!!errors.description}
                    errorMessage={errors.description?.message}
                >
                    <Controller
                        name="description"
                        control={control}
                        render={({ field }) =>
                            <Input
                                {...field}
                                textArea
                            />
                        }
                    />
                </FormItem>
            </div>
        </Card>
    )
}

export default ReasonSection