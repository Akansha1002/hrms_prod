import Card from '@/components/ui/Card'
import Input from '@/components/ui/Input'
import { FormItem } from '@/components/ui/Form'
import { Controller } from 'react-hook-form'
import Radio from '@/components/ui/Radio'
import { FormSectionBaseProps } from '../types'

type JoiningBonusProps = FormSectionBaseProps

const JoiningBonusSection = ({ control, errors }: JoiningBonusProps) => {

    return (
        <Card>
            <h4 className="mb-6">Joining Bonus</h4>
            <div className="grid md:grid-cols-2 gap-4">
                <div>
                <p className="mb-4">Joining Bonus</p>
                    <Radio className="mr-4" name="yes">
                        Yes
                    </Radio>
                    <Radio defaultChecked name="no">
                        No
                    </Radio>
                </div>
                <FormItem
                    label="Joining Bonus Amount"
                    invalid={Boolean(errors.joiningBonus)}
                    errorMessage={errors.joiningBonus?.message}
                >
                    <Controller name="joiningBonus" control={control} render={({ field }) => <Input type="text" {...field} />} />
                </FormItem>
                <div>
                <p className="mb-4">Payout Mode</p>
                    <Radio className="mr-4" name="joining">
                        On Joining
                    </Radio>
                    <Radio defaultChecked name="deferred">
                        Deferred
                    </Radio>
                </div>
                <FormItem
                    label="F & F Recovery for Joining Bonus"
                    invalid={Boolean(errors.joiningBonus)}
                    errorMessage={errors.joiningBonus?.message}
                >
                    <Controller name="joiningBonus" control={control} render={({ field }) => <Input type="text" {...field} />} />
                </FormItem>
            </div>
        </Card>
    )
}

export default JoiningBonusSection
