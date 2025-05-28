
import { type Control, Controller } from "react-hook-form"
import Card from "@/components/ui/Card"
import Input from "@/components/ui/Input"
import { FormItem } from "@/components/ui/Form"
import { Select } from "@/components/ui/Select"

import useSWR from "swr"
import { apiGetEmployeeNameList } from "@/services/HolidayService"
import { DetailsSchema } from "../TaxExemptionDeclarationCreate"
import { apiGetCompany, apiGetCurrency, apiGetPayrollPeriod } from "@/services/TaxExemptionDeclarationService"
import { co } from "@fullcalendar/core/internal-common"
import { symbol } from "zod"
import { useEffect } from "react"

type DetailsFormProps = {
  control: Control<DetailsSchema>
  errors: Record<string, any>
  data?: Partial<DetailsSchema>
  watch?: any
  setValue?: any
}

const DetailsForm = ({ control, errors, data, watch, setValue }: DetailsFormProps) => {

  const { data: employeeData, error, isLoading: isEmployeeLoading } = useSWR(
    ['/api/resource/Employee/attendance', {}],
    ([_, params]) => apiGetEmployeeNameList<
      { data: { name: string; employee_name: string }[] },
      Record<string, unknown>
    >(params),
    { revalidateOnFocus: false }
  )

  // Transform Data for Dropdown
  const employeeOptions = employeeData?.data?.map((emp) => ({
    value: emp.name,
    label: `${emp.employee_name} (${emp.name})`,
    employee_name: emp.employee_name
  })) || []


  const { data: payrollPeriodData, isLoading: isPayrollPeriodLoading } = useSWR(
    '/api/resource/Payroll Period',
    () => apiGetPayrollPeriod(),
    { revalidateOnFocus: false }
  )

  console.log(payrollPeriodData)

  const payrollPeriodOptions =
    payrollPeriodData?.data?.map((period) => ({
      value: period.name,
      label: period.name,
    })) || []

  const { data: currencyData, isLoading: isCurrencyLoading } = useSWR(
    '/api/resource/Currency',
    () => apiGetCurrency(),
    { revalidateOnFocus: false }
  )

  console.log(currencyData)

  const currencyOptions =
    currencyData?.data?.map((currency) => ({
      value: currency.name,
      label: currency.name,
      symbol: currency.symbol
    })) || []

  const { data: companyData, isLoading: isCompanyLoading } = useSWR(
    '/api/resource/Company',
    () => apiGetCompany(),
    { revalidateOnFocus: false }
  )

  console.log(companyData)

  const companyOptions =
    companyData?.data?.map((company) => ({
      value: company.name,
      label: company.name,
    })) || []


  const employee_number = watch('employee')

  useEffect(() => {
    const matched = employeeOptions.find(emp => emp.value === employee_number)
    if (matched) {
      setValue('employee_name', matched.employee_name)
    } else {
      setValue('employee_name', '')
    }
  }, [employee_number, employeeOptions, setValue])

  return (
    <Card>
      <h4 className="mb-6">Details</h4>
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
                  employeeOptions.find((opt) => opt.value === watch('employee'))?.label.split(' (')[0] || ''
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
          label="Payroll"
          invalid={Boolean(errors.reports_to)}
          errorMessage={errors.reports_to?.message}
          asterisk={true}
        >
          <Controller
            name="payroll_period"
            control={control}
            render={({ field }) => (
              <Select
                options={
                  isPayrollPeriodLoading
                    ? [{ value: '', label: 'Loading...' }]
                    : payrollPeriodOptions
                }
                value={
                  payrollPeriodOptions.find(
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
          label="Currency"
          invalid={Boolean(errors.reports_to)}
          errorMessage={errors.reports_to?.message}
          asterisk={true}
        >
          <Controller
            name="currency"
            control={control}
            render={({ field }) => (
              // <Select
              //   options={
              //     isCurrencyLoading
              //       ? [{ value: '', label: 'Loading...' }]
              //       : currencyOptions
              //   }
              //   value={
              //     currencyOptions.find(
              //       (option) =>
              //         option.value === field.value || option.value === 'INR',
              //     ) || null
              //   }
              //   onChange={(option) =>
              //     field.onChange(option ? option.value : '')
              //   }
              // />

              <Input
                value={field.value || 'INR'}
                onChange={(event) => field.onChange(event.target.value)}
                readOnly
              />
            )}
          />
        </FormItem>

      </div>
    </Card>
  )
}

export default DetailsForm
