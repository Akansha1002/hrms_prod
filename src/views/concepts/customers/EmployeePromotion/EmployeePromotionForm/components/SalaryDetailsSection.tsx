import Card from '@/components/ui/Card'
import Input from '@/components/ui/Input'
import { FormItem } from '@/components/ui/Form'
import { Controller, useWatch } from 'react-hook-form'
import { FormSectionBaseProps } from '../types'

type SalaryDetailsSectionProps = FormSectionBaseProps

const SalaryDetailsSection = ({ control, errors }: SalaryDetailsSectionProps) => {
    const currentCtc = useWatch({
        control,
        name: 'current_ctc',
    })

    return (
        <Card>
            <h4 className="mb-6">Salary Details</h4>
            <div className="grid md:grid-cols-2 gap-4">
                <FormItem
                    label="Current CTC"
                    invalid={Boolean(errors.current_ctc)}
                    errorMessage={errors.current_ctc?.message}
                >
                    <Controller
                        name="current_ctc"
                        control={control}
                        render={({ field }) => (
                            <Input
                                type="text"
                                autoComplete="off"
                                placeholder="0.00"
                                {...field}
                            />
                        )}
                    />
                </FormItem>

                {currentCtc && (
                    <FormItem
                        label="Revised CTC"
                        invalid={Boolean(errors.revised_ctc)}
                        errorMessage={errors.revised_ctc?.message}
                    >
                        <Controller
                            name="revised_ctc"
                            control={control}
                            render={({ field }) => (
                                <Input
                                    type="text"
                                    autoComplete="off"
                                    placeholder="0.00"
                                    {...field}
                                />
                            )}
                        />
                    </FormItem>
                )}
            </div>
        </Card>
    )
}

export default SalaryDetailsSection