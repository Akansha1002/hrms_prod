import { Controller } from 'react-hook-form'
import useSWR from 'swr'
import { useEffect } from 'react'

import { FormItem } from '@/components/ui/Form'
import Input from '@/components/ui/Input'
import Checkbox from '@/components/ui/Checkbox'
import { Select } from '@/components/ui/Select'
import DatePicker from '@/components/ui/DatePicker'

import { apiGetEmployeeNameList } from '@/services/HolidayService'
import { apiGetCompany } from '@/services/TaxExemptionDeclarationService'

type AttendanceDetailsFormProps = {
    control: any
    errors: Record<string, any>
    watch: any
    setValue: any
    data?: any
}

const AttendanceForm = ({
    control,
    errors,
    watch,
    setValue,
}: AttendanceDetailsFormProps) => {
    const { data: employeeData, isLoading: isEmployeeLoading } = useSWR(
        ['/api/resource/Employee/attendance', {}],
        ([_, params]) =>
            apiGetEmployeeNameList<
                { data: { name: string; employee_name: string }[] },
                Record<string, unknown>
            >(params),
        { revalidateOnFocus: false },
    )

    const { data: companyData, isLoading: isCompanyLoading } = useSWR(
        '/api/resource/Company',
        () => apiGetCompany(),
        { revalidateOnFocus: false },
    )

    const employeeOptions =
        employeeData?.data?.map((emp) => ({
            value: emp.name,
            label: `${emp.employee_name} (${emp.name})`,
        })) || []

    const companyOptions =
        companyData?.data?.map((company) => ({
            value: company.name,
            label: company.name,
        })) || []

    const employeeId = watch('employee')

    useEffect(() => {
        const matched = employeeOptions.find((e) => e.value === employeeId)
        setValue('employee_name', matched ? matched.label : '')
    }, [employeeId, employeeOptions, setValue])

    return (
        <>
            <div className="grid md:grid-cols-2 gap-4">
                <FormItem label="Series" asterisk invalid={!!errors.series}>
                    <Controller
                        name="series"
                        control={control}
                        render={({ field }) => (
                            <Select
                                options={[
                                    {
                                        value: 'HR-ATT-.YYYY.-',
                                        label: 'HR-ATT-.YYYY.-',
                                    },
                                ]}
                                value={{
                                    label: field.value,
                                    value: field.value,
                                }}
                                onChange={(option) =>
                                    field.onChange(option?.value || '')
                                }
                            />
                        )}
                    />
                </FormItem>

                <FormItem
                    label="Attendance Date"
                    asterisk
                    invalid={!!errors.attendance_date}
                >
                    <Controller
                        name="attendance_date"
                        control={control}
                        render={({ field }) => (
                            <DatePicker
                                value={
                                    field.value ? new Date(field.value) : null
                                }
                                onChange={(date) =>
                                    field.onChange(
                                        date ? date.toISOString() : '',
                                    )
                                }
                            />
                        )}
                    />
                </FormItem>

                <FormItem label="Employee" asterisk invalid={!!errors.employee}>
                    <Controller
                        name="employee"
                        control={control}
                        render={({ field }) => (
                            <Select
                                options={
                                    isEmployeeLoading
                                        ? [{ value: '', label: 'Loading...' }]
                                        : employeeOptions
                                }
                                value={
                                    employeeOptions.find(
                                        (opt) => opt.value === field.value,
                                    ) || null
                                }
                                onChange={(option) =>
                                    field.onChange(option?.value || '')
                                }
                            />
                        )}
                    />
                </FormItem>

                <FormItem
                    label="Employee Name"
                    invalid={Boolean(errors.reports_to)}
                    errorMessage={errors.reports_to?.message}
                >
                    <Controller
                        name="employee_name"
                        control={control}
                        render={({ field }) => (
                            <Input
                                className="w-full border rounded px-2 py-1 bg-gray-100 text-gray-800"
                                value={
                                    employeeOptions
                                        .find(
                                            (opt) =>
                                                opt.value === watch('employee'),
                                        )
                                        ?.label.split(' (')[0] || ''
                                }
                                readOnly
                            />
                        )}
                    />
                </FormItem>

                <FormItem label="Company" asterisk invalid={!!errors.company}>
                    <Controller
                        name="company"
                        control={control}
                        render={({ field }) => (
                            <Select
                                options={
                                    isCompanyLoading
                                        ? [{ value: '', label: 'Loading...' }]
                                        : companyOptions
                                }
                                value={
                                    companyOptions.find(
                                        (opt) => opt.value === field.value,
                                    ) || null
                                }
                                onChange={(option) =>
                                    field.onChange(option?.value || '')
                                }
                            />
                        )}
                    />
                </FormItem>

                <FormItem label="Status" asterisk invalid={!!errors.status}>
                    <Controller
                        name="status"
                        control={control}
                        render={({ field }) => (
                            <Select
                                options={[
                                    { label: 'Present', value: 'Present' },
                                    { label: 'Absent', value: 'Absent' },
                                    { label: 'On Leave', value: 'On Leave' },
                                ]}
                                value={{
                                    label: field.value,
                                    value: field.value,
                                }}
                                onChange={(option) =>
                                    field.onChange(option?.value || '')
                                }
                            />
                        )}
                    />
                </FormItem>

                <FormItem
                    label="Regularization Required"
                    invalid={!!errors.regularization_required}
                >
                    <Controller
                        name="regularization_required"
                        control={control}
                        render={({ field }) => (
                            <Checkbox
                                checked={!!field.value}
                                onChange={field.onChange}
                            />
                        )}
                    />
                </FormItem>
            </div>
            <div> Details </div>
            <div className="grid md:grid-cols-2 gap-4">
                <FormItem label="Shift">
                    <Controller
                        name="shift"
                        control={control}
                        render={({ field }) => (
                            <Input
                                value={field.value || ''}
                                onChange={field.onChange}
                            />
                        )}
                    />
                </FormItem>

                <FormItem label="Late Entry">
                    <Controller
                        name="late_entry"
                        control={control}
                        render={({ field }) => (
                            <Checkbox
                                checked={!!field.value}
                                onChange={field.onChange}
                            />
                        )}
                    />
                </FormItem>

                <FormItem label="Early Exit">
                    <Controller
                        name="early_exit"
                        control={control}
                        render={({ field }) => (
                            <Checkbox
                                checked={!!field.value}
                                onChange={field.onChange}
                            />
                        )}
                    />
                </FormItem>
            </div>
        </>
    )
}

export default AttendanceForm
