import Card from '@/components/ui/Card'
import Input from '@/components/ui/Input'
import { FormItem } from '@/components/ui/Form'
import Select from '@/components/ui/Select'
import Switcher from '@/components/ui/Switcher'
import { Controller } from 'react-hook-form'
import { FormSectionBaseProps } from '../types'

type ResignationInfoSectionProps = FormSectionBaseProps

const ResignationInfoSection = ({ control, errors }: ResignationInfoSectionProps) => {
    return (
        <Card>
            <h4 className="mb-6">Resignation Info</h4>
            <div className="grid md:grid-cols-2 gap-4">
                <FormItem
                    label="Separation Type"
                    asterisk
                    invalid={Boolean(errors.separation_type)}
                    errorMessage={errors.separation_type?.message}
                >
                    <Controller
                        name="separation_type"
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
                <FormItem
                    label="Resignation Reason"
                    asterisk
                    invalid={Boolean(errors.resignation_reason)}
                    errorMessage={errors.resignation_reason?.message}
                >
                    <Controller
                        name="resignation_reason"
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
                <FormItem
                    label="Resignation Letter Date"
                    invalid={Boolean(errors.resignation_letter_date)}
                    errorMessage={errors.resignation_letter_date?.message}
                >
                    <Controller
                        name="resignation_letter_date"
                        control={control}
                        render={({ field }) => (
                            <Input
                                type="date"
                                {...field}
                            />
                        )}
                    />
                </FormItem>
                <FormItem
                    label="Request Relieving Date"
                    invalid={Boolean(errors.request_relieving_date)}
                    errorMessage={errors.request_relieving_date?.message}
                >
                    <Controller
                        name="request_relieving_date"
                        control={control}
                        render={({ field }) => (
                            <Input
                                type="date"
                                {...field}
                            />
                        )}
                    />
                </FormItem>
                <FormItem
                    label="Actual Relieving Date"
                    invalid={Boolean(errors.actual_relieving_date)}
                    errorMessage={errors.actual_relieving_date?.message}
                >
                    <Controller
                        name="actual_relieving_date"
                        control={control}
                        render={({ field }) => (
                            <Input
                                type="date"
                                {...field}
                            />
                        )}
                    />
                </FormItem>
                <FormItem
                    label="Notice Period"
                    invalid={Boolean(errors.notice_period)}
                    errorMessage={errors.notice_period?.message}
                >
                    <Controller
                        name="notice_period"
                        control={control}
                        render={({ field }) => (
                            <Input
                                type="text"
                                {...field}
                            />
                        )}
                    />
                </FormItem>
                <FormItem
                    label="End of Notice Period"
                    invalid={Boolean(errors.end_of_notice_period)}
                    errorMessage={errors.end_of_notice_period?.message}
                >
                    <Controller
                        name="end_of_notice_period"
                        control={control}
                        render={({ field }) => (
                            <Input
                                type="text"
                                {...field}
                            />
                        )}
                    />
                </FormItem>
                <FormItem
                    label="Notice Period Shortfall"
                    invalid={Boolean(errors.notice_period_shortfall)}
                    errorMessage={errors.notice_period_shortfall?.message}
                >
                    <Controller
                        name="notice_period_shortfall"
                        control={control}
                        render={({ field }) => (
                            <Input
                                type="text"
                                {...field}
                            />
                        )}
                    />
                </FormItem>
                <FormItem
                    label="Next Employer"
                    invalid={Boolean(errors.next_employer)}
                    errorMessage={errors.next_employer?.message}
                >
                    <Controller
                        name="next_employer"
                        control={control}
                        render={({ field }) => (
                            <Input
                                type="text"
                                {...field}
                            />
                        )}
                    />
                </FormItem>
                <FormItem
                    label="Employee Reason"
                    invalid={Boolean(errors.employee_reason)}
                    errorMessage={errors.employee_reason?.message}
                >
                    <Controller
                        name="employee_reason"
                        control={control}
                        render={({ field }) => (
                            <Input
                                type="text"
                                {...field}
                            />
                        )}
                    />
                </FormItem>
                <FormItem
                    label="Mailing Address"
                    asterisk
                    invalid={Boolean(errors.mailing_address)}
                    errorMessage={errors.mailing_address?.message}
                >
                    <Controller
                        name="mailing_address"
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
                <FormItem
                    label="Other Address"
                    invalid={Boolean(errors.other_address)}
                    errorMessage={errors.other_address?.message}
                >
                    <Controller
                        name="other_address"
                        control={control}
                        render={({ field }) => (
                            <Input
                                type="text"
                                {...field}
                            />
                        )}
                    />
                </FormItem>
                <FormItem
                    label="Personal EMail ID"
                    invalid={Boolean(errors.personal_email_id)}
                    errorMessage={errors.personal_email_id?.message}
                >
                    <Controller
                        name="personal_email_id"
                        control={control}
                        render={({ field }) => (
                            <Input
                                type="text"
                                {...field}
                            />
                        )}
                    />
                </FormItem>
                <FormItem>
                    <Controller
                        name="under_investigation"
                        control={control}
                        render={({ field }) => (
                            <div className="flex items-center gap-1">
                                <Switcher
                                    checked={field.value}
                                    onChange={(checked) => {
                                        field.onChange(checked)
                                    }}
                                />
                                <p>Under Investigation</p>
                            </div>
                        )}
                    />
                </FormItem>
                <FormItem>
                    <Controller
                        name="volumtary_resignation"
                        control={control}
                        render={({ field }) => (
                            <div className="flex items-center gap-1">
                                <Switcher
                                    checked={field.value}
                                    onChange={(checked) => {
                                        field.onChange(checked)
                                    }}
                                />
                                <p>Volumtary Resignation</p>
                            </div>
                        )}
                    />
                </FormItem>
                <FormItem>
                    <Controller
                        name="do_not_hire"
                        control={control}
                        render={({ field }) => (
                            <div className="flex items-center gap-1">
                                <Switcher
                                    checked={field.value}
                                    onChange={(checked) => {
                                        field.onChange(checked)
                                    }}
                                />
                                <p>Do Not Hire</p>
                            </div>
                        )}
                    />
                </FormItem>
                <FormItem
                    label="Reason For Do Not Hire"
                    invalid={Boolean(errors.reason_for_do_not_hire)}
                    errorMessage={errors.reason_for_do_not_hire?.message}
                >
                    <Controller
                        name="reason_for_do_not_hire"
                        control={control}
                        render={({ field }) => (
                            <Input
                                type="text"
                                {...field}
                            />
                        )}
                    />
                </FormItem>
            </div>
        </Card>
    )
}

export default ResignationInfoSection