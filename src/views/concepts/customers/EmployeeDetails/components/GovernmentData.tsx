import Card from '@/components/ui/Card'
import Input from '@/components/ui/Input'
import { FormItem } from '@/components/ui/Form'
import { Controller } from 'react-hook-form'
import type { FormSectionBaseProps } from '../types'

type GovernmemtDataProps = FormSectionBaseProps & {
    data?: Record<string, any>
}

const PAN_REGEX = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/
const AADHAR_REGEX = /^\d{12}$/

const GovernmemtData = ({ control, errors, data }: GovernmemtDataProps) => {
    return (
        <Card>
            <h4 className="mb-6">Government Data</h4>
            <div className="grid md:grid-cols-2 gap-4">
                <FormItem
                    asterisk
                    label="Aadhar No."
                    invalid={Boolean(errors.aadhar_number)}
                    errorMessage={errors.aadhar_number?.message}
                >
                    <Controller
                        name="aadhar_number"
                        control={control}
                        defaultValue={data?.aadhar_number || ''}
                        rules={{
                            required: 'Aadhar Number is required', // Required field validation
                            pattern: {
                                value: AADHAR_REGEX,
                                message:
                                    'Invalid Aadhar Number. It must be 12 digits.', // Error message for invalid Aadhar
                            },
                        }}
                        render={({ field }) => <Input type="text" {...field} />}
                    />
                </FormItem>
                <FormItem
                    asterisk
                    label="PAN Number"
                    invalid={Boolean(errors.pan_number)}
                    errorMessage={errors.pan_number?.message}
                >
                    <Controller
                        name="pan_number"
                        control={control}
                        defaultValue={data?.pan_number || ''}
                        rules={{
                            required: 'PAN Number is required',
                            pattern: {
                                value: PAN_REGEX,
                                message: 'Invalid PAN Number',
                            },
                        }}
                        render={({ field }) => <Input type="text" {...field} />}
                    />
                </FormItem>
                {/* <FormItem label="UAN Number" invalid={Boolean(errors.uanNumber)} errorMessage={errors.uanNumber?.message}>
                    <Controller name="uanNumber" control={control} render={({ field }) => <Input type="text" {...field} />} />
                </FormItem> */}
            </div>
        </Card>
    )
}

export default GovernmemtData
