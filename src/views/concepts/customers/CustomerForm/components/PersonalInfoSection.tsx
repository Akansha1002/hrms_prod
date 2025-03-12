import Card from '@/components/ui/Card'
import Input from '@/components/ui/Input'
import Select, { Option as DefaultOption } from '@/components/ui/Select'
import { FormItem } from '@/components/ui/Form'
import NumericInput from '@/components/shared/NumericInput'
import { Controller } from 'react-hook-form'
import { FormSectionBaseProps } from '../types'
import { BiLogoGmail } from 'react-icons/bi'

type PersonalInfoSectionProps = FormSectionBaseProps

const salutationOptions = [
    { value: 'Mr', label: 'Mr' },
    { value: 'Ms', label: 'Ms' },
    { value: 'Dr', label: 'Dr' },
]

const genderOptions = [
    { value: 'Male', label: 'Male' },
    { value: 'Female', label: 'Female' },
]

const PersonalInfoSection = ({ control, errors, setValue }: PersonalInfoSectionProps) => {

    return (
        <Card>
            <h4 className="mb-6">Personal</h4>
            <div className="grid md:grid-cols-2 gap-4">
                <FormItem
                    label="Salutation"
                    invalid={Boolean(errors.salutation)}
                    errorMessage={errors.salutation?.message}
                >
                    <Controller
                        name="salutation"
                        control={control}
                        render={({ field }) => (
                            <Select
                                options={salutationOptions}
                                value={
                                    salutationOptions.find(
                                        (option) =>
                                            option.value === field.value,
                                    ) || null
                                }
                                onChange={(option) =>
                                    field.onChange(option ? option.value : '')
                                }
                            />
                        )}
                    />
                </FormItem>
                <FormItem
                    label="First Name"
                    asterisk
                    invalid={Boolean(errors.first_name)}
                    errorMessage={errors.first_name?.message}
                >
                    <Controller
                        name="first_name"
                        control={control}
                        render={({ field }) => (
                            <Input
                                type="text"
                                autoComplete="off"
                                placeholder="First Name"
                                {...field}
                            />
                        )}
                    />
                </FormItem>
                <FormItem
                    label="Middle Name"
                    invalid={Boolean(errors.middle_name)}
                    errorMessage={errors.middle_name?.message}
                >
                    <Controller
                        name="middle_name"
                        control={control}
                        render={({ field }) => (
                            <Input
                                type="text"
                                autoComplete="off"
                                placeholder="Middle Name"
                                value={field.value ?? ''}
                                onChange={field.onChange}
                                onBlur={field.onBlur}
                            />
                        )}
                    />
                </FormItem>
                <FormItem
                    asterisk
                    label="Last Name"
                    invalid={Boolean(errors.last_name)}
                    errorMessage={errors.last_name?.message}
                >
                    <Controller
                        name="last_name"
                        control={control}
                        render={({ field }) => (
                            <Input
                                type="text"
                                autoComplete="off"
                                placeholder="Last Name"
                                {...field}
                            />
                        )}
                    />
                </FormItem>
                <FormItem
                    asterisk
                    label="Date of Birth"
                    invalid={Boolean(errors.date_of_birth)}
                    errorMessage={errors.date_of_birth?.message}
                >
                    <Controller
                        name="date_of_birth"
                        control={control}
                        render={({ field }) => <Input type="date" {...field} />}
                    />
                </FormItem>
                <FormItem
                    asterisk
                    label="Gender"
                    invalid={Boolean(errors.gender)}
                >
                    <Controller
                        name="gender"
                        control={control}
                        render={({ field }) => (
                            <Select
                                options={genderOptions}
                                value={
                                    genderOptions.find(
                                        (option) =>
                                            option.value === field.value,
                                    ) || null
                                }
                                onChange={(option) =>
                                    field.onChange(option ? option.value : '')
                                }
                            />
                        )}
                    />
                </FormItem>
                {/* <FormItem
                    label="Employee No."
                    invalid={Boolean(errors.employee)}
                    errorMessage={errors.employee?.message}
                >
                    <Controller
                        name="employee"
                        control={control}
                        render={({ field }) => (
                            <NumericInput
                                placeholder="Employee Number"
                                autoComplete="off"
                                value={field.value || ''}
                                onChange={field.onChange}
                                onBlur={field.onBlur}
                            />
                        )}
                    />
                </FormItem> */}
                <FormItem
                    asterisk
                    label="Personal Email"
                    invalid={Boolean(errors.personal_email)}
                    errorMessage={errors.personal_email?.message}
                >
                    <Controller
                        name="personal_email"
                        control={control}
                        render={({ field }) =>
                            <Input
                                type='email'
                            />
                        }
                    />
                </FormItem>
            </div>
        </Card>
    )
}

export default PersonalInfoSection
