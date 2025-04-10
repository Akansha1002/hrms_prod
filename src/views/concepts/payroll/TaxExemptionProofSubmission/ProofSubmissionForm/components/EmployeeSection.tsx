import Card from '@/components/ui/Card'
import Input from '@/components/ui/Input'
import { FormItem } from '@/components/ui/Form'
import Select from '@/components/ui/Select'
import { Controller } from 'react-hook-form'
import { FormSectionBaseProps } from '../types'
import { useEffect } from 'react'
import { cu } from '@fullcalendar/core/internal-common'

type EmployeeSectionProps = FormSectionBaseProps & {
  onChange: () => void;
  setValue: any;
  employeeData: { value: string; label: string; name: string }[];
  payrollPeriodList: { value: string; label: string }[];
  companyList: { value: string; label: string }[];
  currencyList: { value: string; label: string }[];
  isLoading: boolean;
}

const EmployeeSection = ({ control, errors, onChange, employeeData, payrollPeriodList, companyList, currencyList, isLoading, setValue }: EmployeeSectionProps) => {

  const handleEmployeeChange = (selectedValue: string) => {
    const selectedEmployee = employeeData.find(emp => emp.value === selectedValue);

    setValue('employee', selectedValue);
    setValue('employee_name', selectedEmployee?.name || '');

    onChange();
  };

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setValue('submission_date', today);
  }, [setValue]);


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
                    ? [{ value: '', label: 'Loading...' }]
                    : employeeData
                }
                value={
                  employeeData.find(
                    (option) =>
                      option.value === field.value,
                  ) || null
                }
                onChange={(option) => {
                  // field.onChange(option ? option.value : '')
                  const selectedValue = option ? option.value : '';
                  handleEmployeeChange(selectedValue);
                }}
              />
            )}
          />
        </FormItem>
        <FormItem
          asterisk
          label="Submission Date"
          invalid={Boolean(errors.submission_date)}
          errorMessage={errors.submission_date?.message}
        >
          <Controller
            name="submission_date"
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
          invalid={Boolean(errors.employee_name)}
          errorMessage={errors.employee_name?.message}
        >
          <Controller
            name="employee_name"
            control={control}
            render={({ field }) =>
              <Input
                type="text"
                disabled
                value={field.value}
                onChange={field.onChange}
              />
            }
          />
        </FormItem>
        <FormItem
          asterisk
          label="Payroll Period"
          invalid={Boolean(errors.payroll_period)}
          errorMessage={errors.payroll_period?.message}
        >
          <Controller
            name="payroll_period"
            control={control}
            render={({ field }) =>
              <Select
                options={isLoading
                  ? [{ value: '', label: 'Loading...' }]
                  : payrollPeriodList
                }
                value={
                  payrollPeriodList.find(
                    (option) =>
                      option.value === field.value,
                  ) || null
                }
                onChange={(option) => {
                  field.onChange(option ? option.value : '')
                }}
              />
            }
          />

        </FormItem>
        <FormItem
          label="Currency"
          asterisk
          invalid={Boolean(errors.currency)}
          errorMessage={errors.currency?.message}
        >
          <Controller
            name="currency"
            control={control}
            render={({ field }) =>
              // <Select
                // options={isLoading
                //   ? [{ value: '', label: 'Loading...' }]
                //   : currencyList
                // }
                // value={
                //   currencyList.find(
                //     (option) =>
                //       option.value === field.value,
                //   ) || null
                // }
                // onChange={(option) => {
                //   field.onChange(option ? option.value : '')
                // }}
              // />
              <Input
                type="text"
                disabled
                value={field.value}
                onChange={field.onChange}
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
                options={isLoading
                  ? [{ value: '', label: 'Loading...' }]
                  : companyList
                }
                value={
                  companyList.find(
                    (option) =>
                      option.value === field.value,
                  ) || null
                }
                onChange={(option) => {
                  field.onChange(option ? option.value : '')
                }}
              />
            }
          />
        </FormItem>
      </div>
    </Card>
  )
}

export default EmployeeSection
