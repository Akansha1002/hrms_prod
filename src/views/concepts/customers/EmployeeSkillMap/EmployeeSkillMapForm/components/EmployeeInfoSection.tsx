import Card from '@/components/ui/Card'
import Input from '@/components/ui/Input'
import { FormItem } from '@/components/ui/Form'
import { Controller } from 'react-hook-form'
import { Select } from '@/components/ui/Select'
import { useState } from 'react'
import { FormSectionBaseProps } from '../types'

type EmployeeInfoSectionProps = FormSectionBaseProps & {
    employeeData: { value: string; label: string; name: string }[];
    isLoading: boolean
}

const EmployeeInfoSection = ({ control, errors, employeeData, isLoading }: EmployeeInfoSectionProps) => {
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
                                    field.onChange(option?.value || '');
                                }}
                            />
                        )}
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
            </div>
        </Card>
    )
}

export default EmployeeInfoSection