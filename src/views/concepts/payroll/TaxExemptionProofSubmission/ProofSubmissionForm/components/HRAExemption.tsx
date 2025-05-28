import Card from '@/components/ui/Card'
import Input from '@/components/ui/Input'
import Switcher from '@/components/ui/Switcher'
import { FormItem } from '@/components/ui/Form'
import { Controller, useWatch } from 'react-hook-form'
import { Button } from '@/components/ui/Button'
import { useState } from 'react'
import type { FormSectionBaseProps } from '../types'
import { Select } from '@/components/ui/Select'
import Checkbox from '@/components/ui/Checkbox/Checkbox'

type HRAExemptionProps = FormSectionBaseProps

const HRAExemption = ({ control, errors }: HRAExemptionProps) => {

    const houseRentAmount = useWatch({
        control,
        name: 'house_rent_payment_amount'
    })

    return (
        <>
            <Card>
                <h4 className="mb-6">HRA Exemption</h4>
                <div className="grid md:grid-cols-2 gap-4">
                    <FormItem
                        label="House Rent Payment Amount"
                        invalid={Boolean(errors.house_rent_payment_amount)}
                        errorMessage={errors.house_rent_payment_amount?.message}
                    >
                        <Controller
                            name="house_rent_payment_amount"
                            control={control}
                            render={({ field }) =>
                                <Input
                                    type="text"
                                    {...field}
                                />
                            }
                        />
                    </FormItem>

                    <div />

                    {houseRentAmount && (
                        <>
                            <FormItem>
                                <Controller
                                    name="rented_in_metro_city"
                                    control={control}
                                    render={({ field: { value, onChange } }) =>
                                        <Checkbox
                                            checked={value}
                                            onChange={onChange}
                                        >
                                            Rented in Metro City
                                        </Checkbox>
                                    }
                                />
                            </FormItem>
                            <div className="grid md:grid-cols-2 gap-4 md:col-span-2">
                                <FormItem
                                    label="Rented From Date"
                                    invalid={Boolean(errors.rented_from_date)}
                                    errorMessage={errors.rented_from_date?.message}
                                >
                                    <Controller
                                        name="rented_from_date"
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
                                    label="Rented To Date"
                                    invalid={Boolean(errors.rented_to_date)}
                                    errorMessage={errors.rented_to_date?.message}
                                >
                                    <Controller
                                        name="rented_to_date"
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
                        </>
                    )}
                </div>
            </Card>
        </>
    )
}

export default HRAExemption