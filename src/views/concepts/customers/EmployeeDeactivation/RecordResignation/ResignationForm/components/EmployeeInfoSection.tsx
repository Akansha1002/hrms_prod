import Card from '@/components/ui/Card'
import Input from '@/components/ui/Input'
import { FormItem } from '@/components/ui/Form'
import Select from '@/components/ui/Select'
import { Controller } from 'react-hook-form'
import { FormSectionBaseProps } from '../types'

type EmployeeInfoSectionProps = FormSectionBaseProps

const EmployeeInfoSection = ({ control, errors }: EmployeeInfoSectionProps) => {
  return (
    <Card>
      <h4 className="mb-6">Employee</h4>
      <div className="grid md:grid-cols-2 gap-4">
        <FormItem
          label="Employee"
          invalid={Boolean(errors.employee)}
          errorMessage={errors.employee?.message}
        >
          <Controller
            name="employee"
            control={control}
            render={({ field }) => (
              <Select
              // options={
              //   isLoading
              //     ? [{ value: '', label: 'Loading...', name: '' }]
              //     : employeeData
              // }
              // value={
              //   employeeData.find(
              //     (option) =>
              //       option.value === field.value,
              //   ) || null
              // }
              // onChange={(option) => {
              //   handleEmployeeChange(option?.value || '');
              //   field.onChange(option?.value || '');
              // }}
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
          // value={employeeName}
          />
        </FormItem>
        <FormItem
          label="Date Of Joining"
          invalid={Boolean(errors.date_of_joining)}
          errorMessage={errors.date_of_joining?.message}
        >
          <Controller
            name="date_of_joining"
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
          label="Designation"
          invalid={Boolean(errors.designation)}
          errorMessage={errors.designation?.message}
        >
          <Controller
            name="designation"
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
          label="Grade"
          invalid={Boolean(errors.grade)}
          errorMessage={errors.grade?.message}
        >
          <Controller
            name="grade"
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
          label="Business Unit"
          invalid={Boolean(errors.business_unit)}
          errorMessage={errors.business_unit?.message}
        >
          <Controller
            name="business_unit"
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
          label="Department"
          invalid={Boolean(errors.department)}
          errorMessage={errors.department?.message}
        >
          <Controller
            name="department"
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
          label="Location"
          invalid={Boolean(errors.location)}
          errorMessage={errors.location?.message}
        >
          <Controller
            name="location"
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
          label="Reporting Manager"
          invalid={Boolean(errors.reporting_manager)}
          errorMessage={errors.reporting_manager?.message}
        >
          <Controller
            name="reporting_manager"
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
          label="Functional Reporting To"
          invalid={Boolean(errors.functional_reporting_to)}
          errorMessage={errors.functional_reporting_to?.message}
        >
          <Controller
            name="functional_reporting_to"
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
          label="Official Email"
          invalid={Boolean(errors.official_email)}
          errorMessage={errors.official_email?.message}
        >
          <Controller
            name="official_email"
            control={control}
            render={({ field }) =>
              <Input
                type="text"
                {...field}
              />
            }
          />
        </FormItem>
      </div>
    </Card>
  )
}

export default EmployeeInfoSection