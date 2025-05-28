import { useEffect, useState } from 'react'
import { Control, Controller, useFormContext } from 'react-hook-form'
import useSWR from 'swr'

import Input from '@/components/ui/Input'
import { FormItem } from '@/components/ui/Form'
import { Select } from '@/components/ui/Select'
import DatePicker from '@/components/ui/DatePicker'
import Checkbox from '@/components/ui/Checkbox'

import { ExitInterviewSchema } from '../ExitInterviewCreate'
import { apiGetEmployeeNameList } from '@/services/HolidayService'
import { apiGetCompany } from '@/services/TaxExemptionDeclarationService'
import { apiGetEmployeeById } from '@/services/ExitInterviewService'

type ExitInterviewFormProps = {
    control: Control<ExitInterviewSchema>
    errors: Record<string, any>
    data?: Partial<ExitInterviewSchema>
    watch?: any
    setValue?: any
}

const ExitInterviewForm = ({
    control,
    errors,
    data,
    watch,
    setValue,
}: ExitInterviewFormProps) => {
    const { data: employeeData, isLoading: isEmployeeLoading } = useSWR(
        ['/api/resource/Employee/attendance', {}],
        ([_, params]) =>
            apiGetEmployeeNameList<
                { data: { name: string; employee_name: string }[] },
                Record<string, unknown>
            >(params),
        { revalidateOnFocus: false },
    )

    const [selectedEmployeeDetails, setSelectedEmployeeDetails] = useState({
        department: '',
        designation: '',
        reports_to: '',
        date_of_joining: '',
        relieving_date: '',
    })

    const [isLoadingDetails, setIsLoadingDetails] = useState(false)

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
        const fetchEmployeeDetails = async () => {
            if (employee_number) {
                setIsLoadingDetails(true)
                try {
                    const response = await apiGetEmployeeById(employee_number)
                    const employeeDetails = response.data

                    if (employeeDetails) {
                        const {
                            department,
                            designation,
                            reports_to,
                            date_of_joining,
                            relieving_date,
                        } = employeeDetails

                        // Set the employee details
                        setSelectedEmployeeDetails({
                            department: department || '',
                            designation: designation || '',
                            reports_to: reports_to || '',
                            date_of_joining: date_of_joining || '',
                            relieving_date: relieving_date || '',
                        })
                    }
                } catch (error) {
                    console.error('Error fetching employee details:', error)
                    // Show an error message to the user
                    setSelectedEmployeeDetails({
                        department: 'Error loading data',
                        designation: 'Error loading data',
                        reports_to: 'Error loading data',
                        date_of_joining: '',
                        relieving_date: '',
                    })
                } finally {
                    setIsLoadingDetails(false)
                }
            } else {
                // Reset employee details if no employee selected
                setSelectedEmployeeDetails({
                    department: '',
                    designation: '',
                    reports_to: '',
                    date_of_joining: '',
                    relieving_date: '',
                })
            }
        }

        fetchEmployeeDetails()
    }, [employee_number])

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
        { label: 'Scheduled', value: 'Scheduled' },
        { label: 'Completed', value: 'Completed' },
        { label: 'Cancelled', value: 'Cancelled' },
    ]

    // Function to format date for display
    const formatDate = (dateString: string | number | Date) => {
        if (!dateString) return ''
        try {
            const date = new Date(dateString)
            return date
                .toLocaleDateString('en-GB', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                })
                .replace(/\//g, '-')
        } catch (e) {
            return dateString
        }
    }

    // Function to get employee name from ID
    const getEmployeeNameFromId = (employeeId: string) => {
        if (!employeeId) return ''
        const employee = employeeOptions.find((emp) => emp.value === employeeId)
        return employee ? employee.employee_name : employeeId
    }

    return (
        <>
            <div className="grid md:grid-cols-2 gap-4">
                <FormItem
                    label="Employee"
                    invalid={Boolean(errors.employee)}
                    errorMessage={errors.employee?.message}
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
                    invalid={Boolean(errors.employee_name)}
                    errorMessage={errors.employee_name?.message}
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
                                            (opt) =>
                                                opt.value === employee_number,
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
                    invalid={Boolean(errors.company)}
                    errorMessage={errors.company?.message}
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

                <FormItem
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
                </FormItem>

                <FormItem
                    invalid={Boolean(errors.date)}
                    errorMessage={errors.date?.message}
                    label="Date"
                >
                    <Controller
                        name="date"
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
            </div>

            {employee_number && (
                <>
                    <div className="mt-6 mb-2 text-lg font-bold">
                        Employee Details
                    </div>
                    <div className="grid md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                        {isLoadingDetails ? (
                            <div className="md:col-span-2 py-4 text-center">
                                Loading employee details...
                            </div>
                        ) : (
                            <>
                                <FormItem label="Department">
                                    <Input
                                        readOnly
                                        value={
                                            selectedEmployeeDetails.department ||
                                            'Not Specified'
                                        }
                                        className="bg-gray-100 text-gray-800"
                                    />
                                </FormItem>

                                <FormItem label="Date of Joining">
                                    <Input
                                        readOnly
                                        value={
                                            formatDate(
                                                selectedEmployeeDetails.date_of_joining,
                                            ) || 'Not Specified'
                                        }
                                        className="bg-gray-100 text-gray-800"
                                    />
                                </FormItem>

                                <FormItem label="Designation">
                                    <Input
                                        readOnly
                                        value={
                                            selectedEmployeeDetails.designation ||
                                            'Not Specified'
                                        }
                                        className="bg-gray-100 text-gray-800"
                                    />
                                </FormItem>

                                <FormItem label="Reports To">
                                    <Input
                                        readOnly
                                        value={
                                            getEmployeeNameFromId(
                                                selectedEmployeeDetails.reports_to,
                                            ) || 'Not Specified'
                                        }
                                        className="bg-gray-100 text-gray-800"
                                    />
                                </FormItem>

                                <FormItem label="Relieving Date">
                                    <Input
                                        readOnly
                                        value={formatDate(
                                            selectedEmployeeDetails.relieving_date,
                                        )}
                                        className="bg-gray-100 text-gray-800"
                                    />
                                </FormItem>
                            </>
                        )}
                    </div>
                </>
            )}

            <div className="mt-6 mb-2 text-lg font-bold">
                {' '}
                Interview Details
            </div>
            <div>
                <FormItem
                    invalid={Boolean(errors.interviewers)}
                    errorMessage={errors.interviewers?.message}
                    label="Interviewers"
                >
                    <Controller
                        name="interviewers"
                        control={control}
                        render={({ field }) => (
                            <Select
                                isMulti
                                options={
                                    isEmployeeLoading
                                        ? [{ value: '', label: 'Loading...' }]
                                        : employeeOptions
                                }
                                value={
                                    Array.isArray(field.value)
                                        ? employeeOptions.filter((opt) =>
                                              field.value.includes(opt.value),
                                          )
                                        : []
                                }
                                onChange={(selected) =>
                                    field.onChange(selected.map((s) => s.value))
                                }
                            />
                        )}
                    />
                </FormItem>

                <FormItem
                    invalid={Boolean(errors.interview_summary)}
                    errorMessage={errors.interview_summary?.message}
                    label="Interview Summary"
                >
                    <Controller
                        name="interview_summary"
                        control={control}
                        render={({ field }) => <Input {...field} />}
                    />
                </FormItem>

                <FormItem
                    invalid={Boolean(errors.interview_summary)}
                    errorMessage={errors.interview_summary?.message}
                    label="Final Decision"
                >
                    <Controller
                        name="final_decision"
                        control={control}
                        render={({ field }) => (
                            <Select
                                options={[
                                    {
                                        value: 'Employee Retained',
                                        label: 'Employee Retained',
                                    },
                                    {
                                        value: 'Exit Confirmed',
                                        label: 'Exit Confirmed',
                                    },
                                ]}
                                value={
                                    field.value
                                        ? {
                                              value: field.value,
                                              label: field.value,
                                          }
                                        : null
                                }
                                onChange={(selected) =>
                                    field.onChange(selected?.value)
                                }
                            />
                        )}
                    />
                </FormItem>
            </div>
        </>
    )
}

export default ExitInterviewForm
