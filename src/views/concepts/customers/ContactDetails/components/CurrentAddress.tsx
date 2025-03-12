import Card from '@/components/ui/Card'
import Input from '@/components/ui/Input'
import { FormItem } from '@/components/ui/Form'
import { Controller } from 'react-hook-form'
import type { FormSectionBaseProps } from '../types'

type CurrentAddressProps = FormSectionBaseProps & {
    data?: Record<string, any>
}


const CurrentAddress = ({ control, errors, data }: CurrentAddressProps) => {
    return (
        <Card>
            <h4 className="mb-6">Current Address</h4>
            <div className="grid md:grid-cols-2 gap-4">
                <FormItem
                    label="Current Address"
                    invalid={Boolean(errors.current_address_1)}
                    errorMessage={errors.current_address_1?.message}
                >
                    <Controller
                        name="current_address_1"
                        control={control}
                        defaultValue={data?.current_address_1 || ''}
                        render={({ field }) =>
                            <Input
                                type="text"
                                {...field}
                            />
                        }
                    />
                </FormItem>
                {/* <FormItem
                    label="Current Address 2"
                    invalid={Boolean(errors.current_address_2)}
                    errorMessage={errors.current_address_2?.message}
                >
                    <Controller
                        name="current_address_2"
                        control={control}
                        defaultValue={data?.current_address_2 || ''}
                        render={({ field }) =>
                            <Input
                                type="text"
                                {...field}
                            />
                        }
                    />
                </FormItem> */}

                <FormItem
                    label="Country"
                    invalid={Boolean(errors.current_address_country)}
                    errorMessage={errors.current_address_country?.message}
                >
                    <Controller
                        name="current_address_country"
                        control={control}
                        defaultValue={data?.current_address_country || ''}
                        render={({ field }) =>
                            <Input
                                type="text"
                                {...field}
                            />
                        }
                    />
                </FormItem>
                <FormItem
                    label="Region"
                    invalid={Boolean(errors.current_address_region)}
                    errorMessage={errors.current_address_region?.message}
                >
                    <Controller
                        name="current_address_region"
                        control={control}
                        defaultValue={data?.current_address_region || ''}
                        render={({ field }) =>
                            <Input
                                type="text"
                                {...field}
                            />
                        }
                    />
                </FormItem>
                <FormItem
                    label="State"
                    invalid={Boolean(errors.current_address_state)}
                    errorMessage={errors.current_address_state?.message}
                >
                    <Controller
                        name="current_address_state"
                        control={control}
                        defaultValue={data?.current_address_state || ''}
                        render={({ field }) =>
                            <Input
                                type="text"
                                {...field}
                            />
                        }
                    />
                </FormItem>
                <FormItem
                    label="State Name"
                    invalid={Boolean(errors.current_address_state_name)}
                    errorMessage={errors.current_address_state_name?.message}
                >
                    <Controller
                        name="current_address_state_name"
                        control={control}
                        defaultValue={data?.permanent_address_1 || ''}
                        render={({ field }) =>
                            <Input
                                type="text"
                                {...field}
                            />
                        }
                    />
                </FormItem>
                <FormItem
                    label="City"
                    invalid={Boolean(errors.current_address_city)}
                    errorMessage={errors.current_address_city?.message}
                >
                    <Controller
                        name="current_address_city"
                        control={control}
                        defaultValue={data?.current_address_city || ''}
                        render={({ field }) =>
                            <Input
                                type="text"
                                {...field}
                            />
                        }
                    />
                </FormItem>
                <FormItem
                    label="Zip Code"
                    invalid={Boolean(errors.current_address_zip_code)}
                    errorMessage={errors.current_address_zip_code?.message}
                >
                    <Controller
                        name="current_address_zip_code"
                        control={control}
                        defaultValue={data?.current_address_zip_code || ''}
                        render={({ field }) =>
                            <Input
                                type="text"
                                {...field}
                            />
                        }
                    />
                </FormItem>

                <FormItem
                    label="Contact Number"
                    invalid={Boolean(errors.current_address_contact_number)}
                    errorMessage={errors.current_address_contact_number?.message}
                >
                    <Controller
                        name="current_address_contact_number"
                        control={control}
                        defaultValue={data?.current_address_contact_number || ''}
                        render={({ field }) =>
                            <Input
                                type="text"
                                {...field}
                            />
                        }
                    />
                </FormItem>
            </div>
        </Card>
    )
}

export default CurrentAddress
