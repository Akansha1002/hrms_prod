import Card from '@/components/ui/Card'
import Input from '@/components/ui/Input'
import { FormItem } from '@/components/ui/Form'
import { Controller } from 'react-hook-form'
import { Select } from '@/components/ui/Select'
import { useState } from 'react'

type PromotionInfoSectionProps = {
    control: any;
    errors: any;
    employeeData: { value: string; label: string; name: string }[];
    isLoading: boolean;
    onEmployeeChange?: (employeeId: string) => void;
}

const PromotionInfoSection = ({ control, errors, employeeData, isLoading, onEmployeeChange }: PromotionInfoSectionProps) => {
    const [employeeName, setEmployeeName] = useState<string>('')

    const handleEmployeeChange = (selectedValue: string) => {
        const selectedEmployee = employeeData.find(emp => emp.value === selectedValue);
        setEmployeeName(selectedEmployee?.name || '')
    }

    return (
        <Card>
            <div className="grid md:grid-cols-2 gap-4">
                <FormItem
                    asterisk
                    label="Employee"
                    invalid={Boolean(errors.employee)}
                    errorMessage={errors.employee?.message}
                >
                    <Controller
                        name="employee"
                        control={control}
                        render={({ field }) => (
                            <Select
                                options={
                                    isLoading
                                        ? [{ value: '', label: 'Loading...', name: '' }]
                                        : employeeData
                                }
                                value={
                                    employeeData.find(
                                        (option) =>
                                            option.value === field.value,
                                    ) || null
                                }
                                onChange={(option) => {
                                    handleEmployeeChange(option?.value || '');
                                    onEmployeeChange?.(option?.value || '');
                                    field.onChange(option?.value || '');
                                }}
                            />
                        )}
                    />
                </FormItem>
                <FormItem
                    asterisk
                    label="Promotion Date"
                    invalid={Boolean(errors.promotion_date)}
                    errorMessage={errors.promotion_date?.message}
                >
                    <Controller
                        name="promotion_date"
                        control={control}
                        render={({ field }) =>
                            <Input
                                type="date"
                                {...field}
                            />
                        }
                    />
                </FormItem>
                <FormItem
                    label="Employee Name"
                >
                    <Input
                        type="text"
                        readOnly
                        value={employeeName}
                    />
                </FormItem>
                <FormItem
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

export default PromotionInfoSection