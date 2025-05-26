"use client"

import { type Control, Controller } from "react-hook-form"
import Card from "@/components/ui/Card"
import Input from "@/components/ui/Input"
import { FormItem } from "@/components/ui/Form"
import { Select } from "@/components/ui/Select"
import type { AttendanceSchema } from "./AttendanceRegularisation"
import useSWR from "swr"
import { apiGetEmployeeNameList } from "@/services/HolidayService"

type AttendanceFormProps = {
  control: Control<AttendanceSchema>
  errors: Record<string, any>
  data?: Partial<AttendanceSchema>
}

const AttendanceForm = ({ control, errors, data }: AttendanceFormProps) => {

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
  })) || []

  return (
    <Card>
      <h4 className="mb-6">Attendance Regularisation Details</h4>
      <div className="grid md:grid-cols-2 gap-4">
        <FormItem
          label="Employee Number"
          invalid={Boolean(errors.reports_to)}
          errorMessage={errors.reports_to?.message}
        >
          <Controller
            name="employee_number"
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
        <FormItem label="Date *" invalid={Boolean(errors.date)} errorMessage={errors.date?.message}>
          <Controller
            name="date"
            control={control}
            defaultValue={data?.date || ""}
            render={({ field }) => <Input type="date" {...field} />}
          />
        </FormItem>

        <FormItem label="Status" invalid={Boolean(errors.status)} errorMessage={errors.status?.message}>
          <Controller
            name="status"
            control={control}
            defaultValue={data?.status || "pending"}
            render={({ field }) => (
              <Select
                options={[
                  { value: "Pending", label: "Pending" },
                  { value: "Approved", label: "Approved" },
                  { value: "Rejected", label: "Rejected" },
                ]}
                value={
                  [
                    { value: "Pending", label: "Pending" },
                    { value: "Approved", label: "Approved" },
                    { value: "Rejected", label: "Rejected" },
                    { value: "Done", label: "Done" },
                  ].find(option => option.value === field.value) || null
                }
                onChange={(option) => field.onChange(option ? option.value : "")}
              />
            )}
          />
        </FormItem>

        <FormItem
          label="Reason"
          invalid={Boolean(errors.reason)}
          errorMessage={errors.reason?.message}
          className="md:col-span-2"
        >
          <Controller
            name="reason"
            control={control}
            defaultValue={data?.reason || null}
            render={({ field }) => (
              <Input
                type="text"
                rows={4}
                value={field.value || ""}
                onChange={(e) => field.onChange(e.target.value || null)}
              />
            )}
          />
        </FormItem>
      </div>
    </Card>
  )
}

export default AttendanceForm

