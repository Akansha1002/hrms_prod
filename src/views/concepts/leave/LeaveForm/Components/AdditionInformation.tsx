import Card from '@/components/ui/Card'
import Input from '@/components/ui/Input'
import Checkbox from '@/components/ui/Checkbox'
import { FormItem } from '@/components/ui/Form'
import { Controller } from 'react-hook-form'
import { FormSectionBaseProps } from '../types'

type LeaveFormProps = FormSectionBaseProps

const AdditionalInformation = ({ control, errors }: LeaveFormProps) => {
    return (
        <Card>
            <h4 className="mb-6">Additional Information</h4>
            <div className="grid md:grid-cols-2 gap-4">
                {/* Is Carry Forward */}
                <FormItem>
                    <Controller
                        name="isCarryForward"
                        control={control}
                        render={({ field }) =>
                            <Checkbox>
                                Is Carry Forward
                            </Checkbox>}

                    />
                </FormItem>

                {/* Is Leave Without Pay */}
                <FormItem>
                    <Controller
                        name="isLeaveWithoutPay"
                        control={control}
                        render={({ field }) =>
                            <Checkbox>
                                Is Leave Without Pay
                            </Checkbox>}
                    />
                </FormItem>

                {/* Is Partially Paid Leave */}
                <FormItem>
                    <Controller
                        name="isPartiallyPaidLeave"
                        control={control}
                        render={({ field }) =>
                            <Checkbox>
                                Is Partially Paid Leave
                            </Checkbox>}
                    />
                </FormItem>

                {/* Is Optional Leave */}
                <FormItem>
                    <Controller
                        name="isOptionalLeave"
                        control={control}
                        render={({ field }) =>
                            <Checkbox>
                                Is Optional Leave
                            </Checkbox>}
                    />
                </FormItem>

                {/* Allow Negative Balance */}
                <FormItem label="">
                    <Controller
                        name="allowNegativeBalance"
                        control={control}
                        render={({ field }) =>
                            <Checkbox>
                                Allow Negative Balance
                            </Checkbox>}
                    />
                </FormItem>

                {/* Allow Over Allocation */}
                <FormItem label="">
                    <Controller
                        name="allowOverAllocation"
                        control={control}
                        render={({ field }) =>
                            <Checkbox>
                                Allow Over Allocation
                            </Checkbox>}
                    />
                </FormItem>

                {/* Include Holidays Within Leaves As Leaves */}
                <FormItem label="">
                    <Controller
                        name="includeHolidaysWithinLeaves"
                        control={control}
                        render={({ field }) =>
                            <Checkbox>
                                Include Holidays Within Leaves as Leaves
                            </Checkbox>}
                    />
                </FormItem>

                {/* Is Compensatory */}
                <FormItem label="">
                    <Controller
                        name="isCompensatory"
                        control={control}
                        render={({ field }) =>
                            <Checkbox>
                                Is Compensatory
                            </Checkbox>}
                    />
                </FormItem>
            </div>
        </Card>
    )
}

export default AdditionalInformation
