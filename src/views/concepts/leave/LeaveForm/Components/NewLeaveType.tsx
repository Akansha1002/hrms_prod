import Card from '@/components/ui/Card'
import Input from '@/components/ui/Input'
import Select from '@/components/ui/Select'
import { FormItem } from '@/components/ui/Form'
import { Controller } from 'react-hook-form'
import { FormSectionBaseProps } from '../types'

type LeaveFormProps = FormSectionBaseProps

const NewLeaveType = ({ control, errors }: LeaveFormProps) => {
    return (
        <Card>
            <div className="grid md:grid-cols-2 gap-4">
                <FormItem
                    label="Leave Code"
                    invalid={Boolean(errors.leaveCode)}
                    errorMessage={errors.leaveCode?.message}
                >
                    <Controller
                        name="leaveCode"
                        control={control}
                        render={({ field }) =>  <Input type="text" {...field} />}
                    />
                </FormItem>

                <FormItem
                    label="Leave Name"
                    invalid={Boolean(errors.leaveName)}
                    errorMessage={errors.leaveName?.message}
                >
                    <Controller
                        name="leaveName"
                        control={control}
                        render={({ field }) =>  <Input type="text" {...field} />}
                    />
                </FormItem>

                <FormItem
                    label="Description of Leave Type"
                    invalid={Boolean(errors.description)}
                    errorMessage={errors.description?.message}
                >
                    <Controller
                        name="description"
                        control={control}
                        render={({ field }) =>  <Input type="text" {...field} />}
                    />
                </FormItem>

                <FormItem
                    label="Sex"
                    invalid={Boolean(errors.sex)}
                    errorMessage={errors.sex?.message}
                >
                    <Controller
                        name="sex"
                        control={control}
                        render={({ field }) => (
                            <Select {...field} options={[
                                { label: 'Male', value: 'male' },
                                { label: 'Female', value: 'female' },
                                { label: 'Other', value: 'other' }
                            ]} />
                        )}
                    />
                </FormItem>

                <FormItem
                    label="Show Only To"
                    invalid={Boolean(errors.showOnlyTo)}
                    errorMessage={errors.showOnlyTo?.message}
                >
                    <Controller
                        name="showOnlyTo"
                        control={control}
                        render={({ field }) => (
                            <Select {...field} options={[
                                { label: 'Employee', value: 'employee' },
                                { label: 'Manager', value: 'manager' },
                                { label: 'HR', value: 'hr' }
                            ]} />
                        )}
                    />
                </FormItem>

                <FormItem
                    label="Effective From"
                    invalid={Boolean(errors.effectiveFrom)}
                    errorMessage={errors.effectiveFrom?.message}
                >
                    <Controller
                        name="effectiveFrom"
                        control={control}
                        render={({ field }) => <Input type="date" {...field} />}
                    />
                </FormItem>

                <FormItem label="Special Leave">
                    <Controller
                        name="specialLeave"
                        control={control}
                        render={({ field }) => <Input type="text" {...field} />}
                    />
                </FormItem>

                <FormItem
                    label="Avail Within (Days)"
                    invalid={Boolean(errors.availWithin)}
                    errorMessage={errors.availWithin?.message}
                >
                    <Controller
                        name="availWithin"
                        control={control}
                        render={({ field }) => <Input type="number" {...field} />}
                    />
                </FormItem>

                <FormItem
                    label="Status"
                    invalid={Boolean(errors.status)}
                    errorMessage={errors.status?.message}
                >
                    <Controller
                        name="status"
                        control={control}
                        render={({ field }) => (
                            <Select {...field} options={[
                                { label: 'Active', value: 'active' },
                                { label: 'Inactive', value: 'inactive' }
                            ]} />
                        )}
                    />
                </FormItem>
            </div>
        </Card>
    )
}

export default NewLeaveType
