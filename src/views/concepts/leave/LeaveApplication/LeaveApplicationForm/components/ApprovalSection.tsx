import Card from '@/components/ui/Card'
import Input from '@/components/ui/Input'
import DatePicker from '@/components/ui/DatePicker'
import { FormItem } from '@/components/ui/Form'
import { Controller } from 'react-hook-form'
import { FormSectionBaseProps } from '../types'
import Select, { Option as DefaultOption } from '@/components/ui/Select'

type ApprovalSectionProps = {
    // FormSectionBaseProps
    control: any;
    errors: any;
    employeeNameList: { value: string; label: string }[];
    isLoading: boolean,
}

const statusOptions = [
    { value: 'Open', label: 'Open' },
    { value: 'Approved', label: 'Approved' },
    { value: 'Rejected', label: 'Rejected' },
    { value: 'Cancelled', label: 'Cancelled' },
]

const ApprovalSection = ({ control, errors, employeeNameList,isLoading }: ApprovalSectionProps) => {
    return (
        <Card>
            <h4 className="mb-6">Approval</h4>
            <div className="grid md:grid-cols-2 gap-4">
                <FormItem
                    label="Leave Approver"
                    asterisk
                    invalid={Boolean(errors.leave_approver)}
                    errorMessage={errors.leave_approver?.message}
                >
                    <Controller
                        name="leave_approver"
                        control={control}
                        render={({ field }) => (
                            <Input
                                type="text"
                                disabled
                                autoComplete="off"
                                placeholder="Leave Approver"
                                {...field}
                            />
                        )}
                    />
                </FormItem>
                {/* <FormItem
                    label="Work Reassign To"
                    invalid={!!errors.custom_work_reassign_to}
                    errorMessage={errors.custom_work_reassign_to?.message}
                >
                    <Controller
                        name="custom_work_reassign_to"
                        control={control}
                        render={({ field }) =>
                            <Select
                                options={
                                    isLoading
                                        ? [{ value: '', label: 'Loading...' }]
                                        : employeeNameList
                                }
                                value={
                                    employeeNameList.find(
                                        (option) =>
                                            option.value === field.value,
                                    ) || null
                                }
                                onChange={(option) =>
                                    field.onChange(option ? option.value : '')
                                }
                            />
                        }
                    />
                </FormItem>
                <FormItem
                    label="Employees to be Notified"
                    invalid={!!errors.custom_employees_to_be_notified}
                    errorMessage={errors.custom_employees_to_be_notified?.message}
                >
                    <Controller
                        name="custom_employees_to_be_notified"
                        control={control}
                        render={({ field }) =>
                            <Select
                                options={
                                    isLoading
                                        ? [{ value: '', label: 'Loading...' }]
                                        : employeeNameList
                                }
                                value={
                                    employeeNameList.find(
                                        (option) =>
                                            option.value === field.value,
                                    ) || null
                                }
                                onChange={(option) =>
                                    field.onChange(option ? option.value : '')
                                }
                            />
                        }
                    />
                </FormItem> */}
                <FormItem
                    label="Posting Date"
                    invalid={!!errors.posting_date}
                    errorMessage={errors.posting_date?.message}
                >
                    <Controller
                        name="posting_date"
                        control={control}
                        render={({ field }) =>
                            <Input
                                type="date"
                                value={field.value ?? ''}
                                onChange={field.onChange}
                                onBlur={field.onBlur}
                            />
                        }
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
            </div>
        </Card>
    )
}

export default ApprovalSection