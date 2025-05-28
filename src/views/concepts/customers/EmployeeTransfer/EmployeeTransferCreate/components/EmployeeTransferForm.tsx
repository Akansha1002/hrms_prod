import { type Control, Controller } from 'react-hook-form'
import Card from '@/components/ui/Card'
import Input from '@/components/ui/Input'
import { FormItem } from '@/components/ui/Form'
import { Select } from '@/components/ui/Select'

import useSWR from 'swr'
import { apiGetEmployeeNameList } from '@/services/HolidayService'
import { EmployeeTransferSchema } from '../EmployeeTransferCreate'
import {
    apiGetCompany,
    apiGetCurrency,
    apiGetPayrollPeriod,
} from '@/services/TaxExemptionDeclarationService'
import { co } from '@fullcalendar/core/internal-common'
import { symbol } from 'zod'
import { useEffect } from 'react'
import DatePicker from '@/components/ui/DatePicker'
import Checkbox from '@/components/ui/Checkbox'

type EmployeeTransferFormProps = {
    control: Control<EmployeeTransferSchema>
    errors: Record<string, any>
    data?: Partial<EmployeeTransferSchema>
    watch?: any
    setValue?: any
}

const EmployeeTransferForm = ({
    control,
    errors,
    data,
    watch,
    setValue,
}: EmployeeTransferFormProps) => {
    const {
        data: employeeData,
        error,
        isLoading: isEmployeeLoading,
    } = useSWR(
        ['/api/resource/Employee/transfer', {}],
        ([_, params]) =>
            apiGetEmployeeNameList<
                { data: { name: string; employee_name: string }[] },
                Record<string, unknown>
            >(params),
        { revalidateOnFocus: false },
    )

    // Transform Data for Dropdown
    const employeeOptions =
        employeeData?.data?.map((emp) => ({
            value: emp.name,
            label: `${emp.employee_name} (${emp.name})`,
            employee_name: emp.employee_name,
        })) || []

    const { data: companyData, isLoading: isCompanyLoading } = useSWR(
        '/api/resource/Company',
        () => apiGetCompany(),
        { revalidateOnFocus: false },
    )

    const companyOptions =
        companyData?.data?.map((company) => ({
            value: company.name,
            label: company.name,
        })) || []

    const employee_number = watch('employee')

    useEffect(() => {
        const matched = employeeOptions.find(
            (emp) => emp.value === employee_number,
        )
        if (matched) {
            setValue('employee_name', matched.employee_name)
        } else {
            setValue('employee_name', '')
        }
    }, [employee_number, employeeOptions, setValue])

    return (
        <div>
            <div className="grid md:grid-cols-2 gap-4">
                <FormItem
                    label="Employee Number"
                    invalid={Boolean(errors.reports_to)}
                    errorMessage={errors.reports_to?.message}
                    asterisk={true}
                >
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
                                        (option) =>
                                            option.value === field.value,
                                    ) || null
                                }
                                onChange={(option) =>
                                    field.onChange(option ? option.value : '')
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

                <FormItem
                    label="Company"
                    invalid={Boolean(errors.reports_to)}
                    errorMessage={errors.reports_to?.message}
                >
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
                                        (option) =>
                                            option.value === field.value,
                                    ) || null
                                }
                                onChange={(option) =>
                                    field.onChange(option ? option.value : '')
                                }
                            />
                        )}
                    />
                </FormItem>

                <FormItem
                    label="New Company"
                    invalid={Boolean(errors.reports_to)}
                    errorMessage={errors.reports_to?.message}
                >
                    <Controller
                        name="new_company"
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
                                        (option) =>
                                            option.value === field.value,
                                    ) || null
                                }
                                onChange={(option) =>
                                    field.onChange(option ? option.value : '')
                                }
                            />
                        )}
                    />
                </FormItem>

                <FormItem
                    label="Transfer"
                    invalid={Boolean(errors.reports_to)}
                    errorMessage={errors.reports_to?.message}
                    asterisk={true}
                >
                    <Controller
                        name="transfer"
                        control={control}
                        render={({ field }) => (
                            <DatePicker
                                placeholder="Pick a date"
                                value={
                                    field.value ? new Date(field.value) : null
                                }
                                onChange={(date) =>
                                    field.onChange(
                                        date ? date.toISOString() : null,
                                    )
                                }
                            />
                        )}
                    />
                </FormItem>

                <FormItem
                    label="Create New Employee Id"
                    invalid={errors && Boolean(errors.rented_in_metro_city)}
                    errorMessage={
                        errors && errors.rented_in_metro_city?.message
                    }
                >
                    <Controller
                        name="create_new_employee_id"
                        control={control}
                        render={({ field }) => (
                            <div className="flex items-center gap-2">
                                <Checkbox
                                    checked={!!field.value}
                                    onChange={field.onChange}
                                />
                            </div>
                        )}
                    />
                </FormItem>
            </div>
        </div>
    )
}

export default EmployeeTransferForm
