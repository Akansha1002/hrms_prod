import { useEffect } from 'react'
import { Controller } from 'react-hook-form'
import useSWR from 'swr'

import Input from '@/components/ui/Input'
import { FormItem } from '@/components/ui/Form'
import { Select } from '@/components/ui/Select'
import DatePicker from '@/components/ui/DatePicker'
import { apiGetAppraisalCycleList } from '@/services/AppraisalService'
import { apiGetEmployeeNameList } from '@/services/HolidayService'
import { apiGetCompany } from '@/services/TaxExemptionDeclarationService'
import { AppraisalFormProps } from './Appraisal'

const Overview = ({
    control,
    errors,
    data,
    watch,
    setValue,
}: AppraisalFormProps) => {
    const { data: employeeData, isLoading: isEmployeeLoading } = useSWR(
        ['/api/resource/Employee/attendance', {}],
        ([_, params]) =>
            apiGetEmployeeNameList<
                { data: { name: string; employee_name: string }[] },
                Record<string, unknown>
            >(params),
        { revalidateOnFocus: false },
    )

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

    const { data: appraisalData, isLoading: isAppraisalLoading } = useSWR(
        '/api/resource/Appraisal Cycle',
        () => apiGetAppraisalCycleList(),
        { revalidateOnFocus: false },
    )

    const appraisalCycleOption =
        appraisalData?.data?.map((data) => ({
            value: data.name,
            label: data.cycle_name,
        })) || []

    console.log('appraisal', appraisalCycleOption)
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

    const statusOptions = [
        { label: 'Pending', value: 'Pending' },
        { label: 'Approved', value: 'Approved' },
        { label: 'Rejected', value: 'Rejected' },
    ]

    return (
        <div className="grid md:grid-cols-2 gap-4">
            <FormItem
                label="Employee"
                invalid={Boolean(errors.reports_to)}
                errorMessage={errors.reports_to?.message}
                asterisk
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
                                    (opt) => opt.value === field.value,
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
                    render={() => (
                        <Input
                            readOnly
                            value={
                                employeeOptions
                                    .find(
                                        (opt) => opt.value === employee_number,
                                    )
                                    ?.label.split(' (')[0] || ''
                            }
                            className="bg-gray-100 text-gray-800"
                        />
                    )}
                />
            </FormItem>

            <FormItem
                label="Company"
                invalid={Boolean(errors.reports_to)}
                errorMessage={errors.reports_to?.message}
                asterisk
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
                                    (opt) => opt.value === field.value,
                                ) || null
                            }
                            onChange={(option) =>
                                field.onChange(option ? option.value : '')
                            }
                        />
                    )}
                />
            </FormItem>

            {/* <FormItem
                label="Status"
                invalid={Boolean(errors.status)}
                errorMessage={errors.status?.message}
            >
                <Controller
                    name="status"
                    control={control}
                    render={({ field }) => (
                        <Select
                            options={statusOptions}
                            value={
                                statusOptions.find(
                                    (opt) => opt.value === field.value,
                                ) || null
                            }
                            onChange={(option) =>
                                field.onChange(option ? option.value : '')
                            }
                        />
                    )}
                />
            </FormItem> */}

            {/* <FormItem
                invalid={Boolean(errors.reports_to)}
                errorMessage={errors.reports_to?.message}
                label="Series"
            >
                <Controller
                    name="series"
                    control={control}
                    render={({ field }) => (
                        <DatePicker
                            placeholder="Pick a date"
                            value={field.value ? new Date(field.value) : null}
                            onChange={(date) =>
                                field.onChange(date ? date.toISOString() : null)
                            }
                        />
                    )}
                />
            </FormItem> */}

            <FormItem
                invalid={Boolean(errors.reports_to)}
                errorMessage={errors.reports_to?.message}
                label="Appraisal Cycle"
                asterisk
            >
                <Controller
                    name="appraisalCycle"
                    control={control}
                    render={({ field }) => (
                        <Select
                            options={
                                isAppraisalLoading
                                    ? [{ value: '', label: 'Loading...' }]
                                    : appraisalCycleOption
                            }
                            value={
                                appraisalCycleOption.find(
                                    (opt) => opt.value === field.value,
                                ) || null
                            }
                            onChange={(option) =>
                                field.onChange(option ? option.value : '')
                            }
                        />
                    )}
                />
            </FormItem>
        </div>
    )
}

export default Overview
