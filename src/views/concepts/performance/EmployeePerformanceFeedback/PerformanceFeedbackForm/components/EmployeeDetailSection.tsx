import Card from '@/components/ui/Card'
import Input from '@/components/ui/Input'
import { FormItem } from '@/components/ui/Form'
import Select from '@/components/ui/Select'
import { Controller, useWatch } from 'react-hook-form'
import { FormSectionBaseProps } from '../types'

type EmployeeDetailSectionProps = FormSectionBaseProps & {
    employeeData: { value: string; label: string; name: string }[];
    employeeName: string;
    setEmployeeName: (name: string) => void;
    // companyList: { value: string; label: string }[];
    isLoading: boolean;
}

const EmployeeDetailSection = ({ control, errors, employeeName, employeeData, setEmployeeName, isLoading }: EmployeeDetailSectionProps) => {
    const handleEmployeeChange = (selectedValue: string) => {
        const selectedEmployee = employeeData.find(emp => emp.value === selectedValue);
        setEmployeeName(selectedEmployee?.name || '');
    };

    return (
        <Card>
            <h4 className="mb-6">Employee</h4>
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
                    asterisk
                    label="Reviewer"
                    invalid={Boolean(errors.reviewer)}
                    errorMessage={errors.reviewer?.message}
                >
                    <Controller
                        name="reviewer"
                        control={control}
                        render={({ field }) =>
                            <Input
                                type="text"
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
                    asterisk
                    label="Added On"
                    invalid={Boolean(errors.added_on)}
                    errorMessage={errors.added_on?.message}
                >
                    <Controller
                        name="added_on"
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
                    label="Company"
                    asterisk
                    invalid={Boolean(errors.company)}
                    errorMessage={errors.company?.message}
                >
                    <Controller
                        name="company"
                        control={control}
                        render={({ field }) =>
                            <Select
                                // options={isLoading
                                //     ? [{ value: '', label: 'Loading...' }]
                                //     : companyList
                                // }
                                // value={
                                //     companyList.find(
                                //         (option) =>
                                //             option.value === field.value,
                                //     ) || null
                                // }
                                // onChange={(option) => {
                                //     field.onChange(option ? option.value : '')
                                // }}
                            />
                        }
                    />
                </FormItem>
            </div>
        </Card>
    )
}

export default EmployeeDetailSection