import Card from '@/components/ui/Card'
import Input from '@/components/ui/Input'
import { FormItem } from '@/components/ui/Form'
import Select from '@/components/ui/Select'
import { Controller } from 'react-hook-form'
import { FormSectionBaseProps } from '../types'

type PayrollSectionProps = FormSectionBaseProps

const PayrollSection = ({ control, errors }: PayrollSectionProps) => {
    return (
        <Card>
            <h4 className="mb-6">Payroll</h4>
            <div className="grid md:grid-cols-2 gap-4">
                <FormItem
                    asterisk
                    label="Last Pay Date"
                    invalid={Boolean(errors.last_pay_date)}
                    errorMessage={errors.last_pay_date?.message}
                >
                    <Controller
                        name="last_pay_date"
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
                    asterisk
                    label="Last Working Date"
                    invalid={Boolean(errors.last_working_date)}
                    errorMessage={errors.last_working_date?.message}
                >
                    <Controller
                        name="last_working_date"
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
                    label="Salary Hold"
                    invalid={Boolean(errors.salary_hold)}
                    errorMessage={errors.salary_hold?.message}
                >
                    <Controller
                        name="salary_hold"
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
                    label="Payment Advice"
                    invalid={Boolean(errors.payment_advice)}
                    errorMessage={errors.payment_advice?.message}
                >
                    <Controller
                        name="payment_advice"
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
                    label="Recover Shortfall"
                    invalid={Boolean(errors.recover_shortfall)}
                    errorMessage={errors.recover_shortfall?.message}
                >
                    <Controller
                        name="recover_shortfall"
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
                    label="Partial Walve Off Days"
                    invalid={Boolean(errors.partial_walve_off_days)}
                    errorMessage={errors.partial_walve_off_days?.message}
                >
                    <Controller
                        name="partial_walve_off_days"
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
                    label="Shortfall Period After Walve Off"
                    invalid={Boolean(errors.shortfall_period_after_walve_off)}
                    errorMessage={errors.shortfall_period_after_walve_off?.message}
                >
                    <Controller
                        name="shortfall_period_after_walve_off"
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
                    label="Reason For Walve Off"
                    invalid={Boolean(errors.reason_for_walve_off)}
                    errorMessage={errors.reason_for_walve_off?.message}
                >
                    <Controller
                        name="reason_for_walve_off"
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

export default PayrollSection