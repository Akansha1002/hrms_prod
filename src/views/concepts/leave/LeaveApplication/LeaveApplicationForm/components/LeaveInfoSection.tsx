import Card from '@/components/ui/Card'
import Input from '@/components/ui/Input'
import { FormItem } from '@/components/ui/Form'
import { Controller } from 'react-hook-form'
import { Select } from '@/components/ui/Select'
import { FormSectionBaseProps } from '../types'

type LeaveInfoSectionProps = {
    // FormSectionBaseProps
    control: any;
    errors: any;
    leaveTypeList: { value: string; label: string }[];
    isLoading: boolean,
}

const LeaveInfoSection = ({ control, errors, leaveTypeList, isLoading }: LeaveInfoSectionProps) => {
    return (
        <Card>
            <div className="grid md:grid-cols-2 gap-4">
                <FormItem
                    label="Employee"
                    asterisk
                    invalid={Boolean(errors.employee)}
                    errorMessage={errors.employee?.message}
                >
                    <Controller
                        name="employee"
                        control={control}
                        render={({ field }) => (
                            <Input
                                type="text"
                                disabled
                                autoComplete="off"
                                placeholder="employee"
                                {...field}
                            />
                        )}
                    />
                </FormItem>
                <FormItem
                    label="Leave Type"
                    asterisk
                    invalid={Boolean(errors.leave_type)}
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
                    label="Employee Name"
                    
                    invalid={Boolean(errors.employee_name)}
                    errorMessage={errors.employee_name?.message}
                >
                    <Controller
                        name="employee_name"
                        control={control}
                        render={({ field }) => (
                            <Input
                                type="text"
                                disabled
                                autoComplete="off"
                                placeholder="Employee Name"
                                {...field}
                            />
                        )}
                    />
                </FormItem>
                <FormItem
                    asterisk
                    label="Company"
                    invalid={Boolean(errors.company)}
                    errorMessage={errors.company?.message}
                >
                    <Controller
                        name="company"
                        control={control}
                        render={({ field }) =>
                            <Input
                                type='text'
                                disabled
                                autoComplete="off"
                                placeholder='Company'
                                {...field}
                            />
                        }
                    />
                </FormItem>
            </div>
        </Card>
    )
}

export default LeaveInfoSection