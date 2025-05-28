import Card from '@/components/ui/Card'
import Input from '@/components/ui/Input'
import { FormItem } from '@/components/ui/Form'
import { Controller } from 'react-hook-form'
import type { FormSectionBaseProps } from './types'

type LicenseDetailsProps = FormSectionBaseProps & {
    data?: Record<string, any>
}

const DrivingLicenseForm = ({ control, errors,data }: LicenseDetailsProps) => {
    return (
        <Card>
            <h4 className="mb-6">Driving License</h4>
            <div className="grid md:grid-cols-2 gap-4">
                <FormItem
                    label="Name as in Driving License"
                    invalid={Boolean(errors.name_as_in_driving_license)}
                    errorMessage={errors.name_as_in_driving_license?.message}
                >
                    <Controller
                        name="name_as_in_driving_license"
                        control={control}
                        defaultValue={data?.name_as_in_driving_license || ''}
                        render={({ field }) =>
                            <Input type="text"
                                {...field}
                            />
                        }
                    />
                </FormItem>

                <FormItem
                    label="Driving License No."
                    invalid={Boolean(errors.driving_license_number)}
                    errorMessage={errors.driving_license_number?.message}
                >
                    <Controller
                        name="driving_license_number"
                        control={control}
                        defaultValue={data?.driving_license_number || ''}
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
                    label="Valid Till"
                    invalid={Boolean(errors.valid_till)}
                    errorMessage={errors.valid_till?.message}
                >
                    <Controller
                        name="valid_till"
                        control={control}
                        defaultValue={data?.name_as_in_passport || ''}
                        render={({ field }) =>
                            <Input type="date" {...field} />
                        }
                    />
                </FormItem>
            </div>
        </Card>
    )
}

export default DrivingLicenseForm
