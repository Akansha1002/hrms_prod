import Card from '@/components/ui/Card'
import Input from '@/components/ui/Input'
import { FormItem } from '@/components/ui/Form'
import Select from '@/components/ui/Select'
import { Controller } from 'react-hook-form'
import { FormSectionBaseProps } from '../types'

type FeedbackRatingSectionProps = FormSectionBaseProps

const FeedbackRatingSection = ({ control, errors }: FormSectionBaseProps) => {
    return (
        <Card>
            <div className="grid md:grid-cols-2 gap-4">
                <FormItem
                    label="Appraisal"
                    asterisk
                    invalid={Boolean(errors.appraisal)}
                    errorMessage={errors.appraisal?.message}
                >
                    <Controller
                        name="appraisal"
                        control={control}
                        render={({ field }) => (
                            <Select
                            // options={
                            //     isLoading
                            //         ? [{ value: '', label: 'Loading...', name: '' }]
                            //         : employeeData
                            // }
                            // value={
                            //     employeeData.find(
                            //         (option) =>
                            //             option.value === field.value,
                            //     ) || null
                            // }
                            // onChange={(option) => {
                            //     field.onChange(option?.value || '');
                            // }}
                            />
                        )}
                    />
                </FormItem>
                <FormItem
                    label="Total Score"
                    invalid={Boolean(errors.total_score)}
                    errorMessage={errors.total_score?.message}
                >
                    <Controller
                        name="total_score"
                        control={control}
                        render={({ field }) =>
                            <Input
                                type="date"
                                {...field}
                            />
                        }
                    />
                </FormItem>
            </div>
        </Card>
    )
}

export default FeedbackRatingSection