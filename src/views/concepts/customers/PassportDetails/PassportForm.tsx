import Card from '@/components/ui/Card'
import Input from '@/components/ui/Input'
import { FormItem } from '@/components/ui/Form'
import { Controller } from 'react-hook-form'
import type { FormSectionBaseProps } from './types'

type PassportFormProps = FormSectionBaseProps & {
    data?: Record<string, any>
}

const PassportForm = ({ control, errors, data }: PassportFormProps) => {
   
    return (
        <Card>
            <h4 className="mb-6">Passport</h4>
            <div className="grid md:grid-cols-2 gap-4">
                <FormItem
                    label="Name as in Passport"
                    invalid={Boolean(errors.name_as_in_passport)}
                    errorMessage={errors.name_as_in_passport?.message}
                >
                    <Controller
                        name="name_as_in_passport"
                        control={control}
                        defaultValue={data?.name_as_in_passport || ''}
                        render={({ field }) =>
                            <Input type="text"
                                {...field}
                            />
                        }
                    />
                </FormItem>

                <FormItem
                    label="Passport No."
                    invalid={Boolean(errors.passport_number)}
                    errorMessage={errors.passport_number?.message}
                >
                    <Controller
                        name="passport_number"
                        control={control}
                        defaultValue={data?.passport_number || ''}
                        render={({ field }) =>
                            <Input type="text" {...field} />
                        }
                    />
                </FormItem>

                <FormItem
                    label="Place of Issue"
                    invalid={Boolean(errors.place_of_issue)}
                    errorMessage={errors.place_of_issue?.message}
                >
                    <Controller
                        name="place_of_issue"
                        control={control}
                        defaultValue={data?.place_of_issue || ''}
                        render={({ field }) =>
                            <Input type="text" {...field} />
                        }
                    />
                </FormItem>

                <FormItem
                    label="Issue Date"
                    invalid={Boolean(errors.issue_date)}
                    errorMessage={errors.issue_date?.message}
                >
                    <Controller
                        name="issue_date"
                        control={control}
                        defaultValue={data?.issue_date || ''}
                        render={({ field }) =>
                            <Input type="date" {...field} />
                        }
                    />
                </FormItem>

                <FormItem
                    label="Expiry/Renewal Date"
                    invalid={Boolean(errors.expiry_renewal_date)}
                    errorMessage={errors.expiry_renewal_date?.message}
                >
                    <Controller
                        name="expiry_renewal_date"
                        control={control}
                        defaultValue={data?.expiry_renewal_date || ''}
                        render={({ field }) =>
                            <Input type="date" {...field} />
                        }
                    />
                </FormItem>

                <FormItem
                    label="ECNR Required"
                    invalid={Boolean(errors.ecnr_required)}
                    errorMessage={errors.ecnr_required?.message}
                >
                    <Controller
                        name="ecnr_required"
                        control={control}
                        defaultValue={data?.ecnr_required || ''}
                        render={({ field }) =>
                            <Input type="text" {...field} />
                        }
                    />
                </FormItem>

                <FormItem
                    label="Date of Birth"
                    invalid={Boolean(errors.date_of_birth)}
                    errorMessage={errors.date_of_birth?.message}
                >
                    <Controller
                        name="date_of_birth"
                        control={control}
                        defaultValue={data?.date_of_birth || ''}
                        render={({ field }) =>
                            <Input type="date" {...field} />
                        }
                    />
                </FormItem>

                <FormItem
                    label="Place of Birth"
                    invalid={Boolean(errors.place_of_birth)}
                    errorMessage={errors.place_of_birth?.message}
                >
                    <Controller
                        name="place_of_birth"
                        control={control}
                        defaultValue={data?.place_of_birth || ''}
                        render={({ field }) =>
                            <Input type="text" {...field} />
                        }
                    />
                </FormItem>
            </div>
        </Card>
    )
}

export default PassportForm
