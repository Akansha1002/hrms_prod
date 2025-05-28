import Card from '@/components/ui/Card'
import Input from '@/components/ui/Input'
import { FormItem } from '@/components/ui/Form'
import { Controller } from 'react-hook-form'
import { FormSectionBaseProps } from '../types'

type DetailSectionProps = FormSectionBaseProps & {
    data?: Record<string, any>
}

const DetailSection = ({ control, errors, data }: DetailSectionProps) => {
    return (
        <Card>
            <h4 className="mb-6">Family Details</h4>
            <div className="grid md:grid-cols-2 gap-4">
                <FormItem
                    label="Relationship"
                    invalid={Boolean(errors.relationship)}
                    errorMessage={errors.relationship?.message}
                >
                    <Controller
                        name="relationship"
                        control={control}
                        defaultValue={data?.relationship || ''}
                        render={({ field }) =>
                            <Input
                                type="text"
                                {...field}
                            />
                        }
                    />
                </FormItem>

                <FormItem
                    label="Name"
                    invalid={Boolean(errors.relation_name)}
                    errorMessage={errors.relation_name?.message}
                >
                    <Controller
                        name="relation_name"
                        control={control}
                        defaultValue={data?.relation_name || ''}
                        render={({ field }) =>
                            <Input
                                type="text"
                                {...field}
                            />
                        }
                    />
                </FormItem>

                <FormItem
                    label="Date of Birth"
                    invalid={Boolean(errors.relationship_dob)}
                    errorMessage={errors.relationship_dob?.message}
                >
                    <Controller
                        name="relationship_dob"
                        control={control}
                        defaultValue={data?.relationship_dob || ''}
                        render={({ field }) =>
                            <Input
                                type="date"
                                {...field}
                            />
                        }
                    />
                </FormItem>

                <FormItem
                    label="Gender"
                    invalid={Boolean(errors.relation_gender)}
                    errorMessage={errors.relation_gender?.message}
                >
                    <Controller
                        name="relation_gender"
                        control={control}
                        defaultValue={data?.relation_gender || ''}
                        render={({ field }) =>
                            <Input
                                type="text"
                                {...field}
                            />
                        }
                    />
                </FormItem>

                <FormItem
                    label="Dependant"
                    invalid={Boolean(errors.relationship_dependant)}
                    errorMessage={errors.relationship_dependant?.message}
                >
                    <Controller name="relationship_dependant" control={control} defaultValue={data?.relationship_dependant || ''} render={({ field }) => <Input type="text" {...field} />} />
                </FormItem>

                <FormItem
                    label="Address"
                    invalid={Boolean(errors.relation_address)}
                    errorMessage={errors.relation_address?.message}
                >
                    <Controller
                        name="relation_address"
                        control={control}
                        defaultValue={data?.relation_address || ''}
                        render={({ field }) =>
                            <Input
                                type="text"
                                {...field} />
                        }
                    />
                </FormItem>

                <FormItem
                    label="Minor"
                    invalid={Boolean(errors.relationship_minor)}
                    errorMessage={errors.relationship_minor?.message}
                >
                    <Controller
                        name="relationship_minor"
                        control={control}
                        defaultValue={data?.relationship_minor || ''}
                        render={({ field }) =>
                            <Input
                                type="text"
                                {...field}
                            />
                        }
                    />
                </FormItem>

                <FormItem
                    label="Guardian Name"
                    invalid={Boolean(errors.relation_guardian_name)}
                    errorMessage={errors.relation_guardian_name?.message}
                >
                    <Controller
                        name="relation_guardian_name"
                        control={control}
                        defaultValue={data?.relation_guardian_name || ''}
                        render={({ field }) =>
                            <Input
                                type="text"
                                {...field}
                            />
                        }
                    />
                </FormItem>

                <FormItem
                    label="Guardian Address"
                    invalid={Boolean(errors.relationship_guardian_address)}
                    errorMessage={errors.relationship_guardian_address?.message}
                >
                    <Controller
                        name="relationship_guardian_address"
                        control={control}
                        defaultValue={data?.relationship_guardian_address || ''}
                        render={({ field }) =>
                            <Input
                                type="text"
                                {...field}
                            />
                        }
                    />
                </FormItem>

                <FormItem
                    label="Guardian's Relation with Nominee"
                    invalid={Boolean(errors.relation_guardians_relation_with_nominee)}
                    errorMessage={errors.relation_guardians_relation_with_nominee?.message}
                >
                    <Controller
                        name="relation_guardians_relation_with_nominee"
                        control={control}
                        defaultValue={data?.relation_guardians_relation_with_nominee || ''}
                        render={({ field }) =>
                            <Input
                                type="text"
                                {...field}
                            />
                        }
                    />
                </FormItem>

                <FormItem
                    label="Guardian Contact Number"
                    invalid={Boolean(errors.relationship_contact_number)}
                    errorMessage={errors.relationship_contact_number?.message}
                >
                    <Controller
                        name="relationship_contact_number"
                        control={control}
                        defaultValue={data?.relationship_contact_number || ''}
                        render={({ field }) =>
                            <Input
                                type="text"
                                {...field}
                            />
                        }
                    />
                </FormItem>

                <FormItem
                    label="Name as in Passport"
                    invalid={Boolean(errors.relation_name_as_in_passport)}
                    errorMessage={errors.relation_name_as_in_passport?.message}
                >
                    <Controller
                        name="relation_name_as_in_passport"
                        control={control}
                        defaultValue={data?.relation_name_as_in_passport || ''}
                        render={({ field }) =>
                            <Input
                                type="text"
                                {...field}
                            />
                        }
                    />
                </FormItem>

                <FormItem
                    label="Passport Number"
                    invalid={Boolean(errors.relationship_passport_number)}
                    errorMessage={errors.relationship_passport_number?.message}
                >
                    <Controller
                        name="relationship_passport_number"
                        control={control}
                        defaultValue={data?.relationship_passport_number || ''}
                        render={({ field }) =>
                            <Input
                                type="text" {...field}
                            />
                        }
                    />
                </FormItem>

                <FormItem
                    label="Place of Issue"
                    invalid={Boolean(errors.relation_place_of_issue)}
                    errorMessage={errors.relation_place_of_issue?.message}
                >
                    <Controller
                        name="relation_place_of_issue"
                        control={control}
                        defaultValue={data?.relation_place_of_issue || ''}
                        render={({ field }) =>
                            <Input
                                type="text"
                                {...field}
                            />
                        }
                    />
                </FormItem>

                <FormItem
                    label="Smoker"
                    invalid={Boolean(errors.relation_smoker)}
                    errorMessage={errors.relation_smoker?.message}
                >
                    <Controller
                        name="relation_smoker"
                        control={control}
                        defaultValue={data?.relation_smoker || ''}
                        render={({ field }) =>
                            <Input
                                type="text"
                                {...field}
                            />
                        }
                    />
                </FormItem>

                <FormItem
                    label="Student"
                    invalid={Boolean(errors.relation_student)}
                    errorMessage={errors.relation_student?.message}
                >
                    <Controller
                        name="relation_student"
                        control={control}
                        defaultValue={data?.relation_student || ''}
                        render={({ field }) =>
                            <Input
                                type="text"
                                {...field}
                            />
                        }
                    />
                </FormItem>

                <FormItem
                    label="Insured"
                    invalid={Boolean(errors.relationship_insured)}
                    errorMessage={errors.relationship_insured?.message}
                >
                    <Controller
                        name="relationship_insured"
                        control={control}
                        defaultValue={data?.relationship_insured || ''}
                        render={({ field }) =>
                            <Input
                                type="text"
                                {...field}
                            />
                        }
                    />
                </FormItem>

                <FormItem
                    label="Occupation"
                    invalid={Boolean(errors.relationship_occupation)}
                    errorMessage={errors.relationship_occupation?.message}
                >
                    <Controller
                        name="relationship_occupation"
                        control={control}
                        defaultValue={data?.relationship_occupation || ''}
                        render={({ field }) =>
                            <Input
                                type="text"
                                {...field}
                            />
                        }
                    />
                </FormItem>

                <FormItem
                    label="Other Insurance"
                    invalid={Boolean(errors.relationship_other_insurance)}
                    errorMessage={errors.relationship_other_insurance?.message}
                >
                    <Controller
                        name="relationship_other_insurance"
                        control={control}
                        defaultValue={data?.relationship_other_insurance || ''}
                        render={({ field }) =>
                            <Input
                                type="text"
                                {...field}
                            />
                        }
                    />
                </FormItem>

                <FormItem
                    label="Graduation Date"
                    invalid={Boolean(errors.relationship_graduation_date)}
                    errorMessage={errors.relationship_graduation_date?.message}
                >
                    <Controller
                        name="relationship_graduation_date"
                        control={control}
                        defaultValue={data?.relationship_graduation_date || ''}
                        render={({ field }) =>
                            <Input
                                type="date"
                                {...field}
                            />
                        }
                    />
                </FormItem>

                <FormItem
                    label="Comments"
                    invalid={Boolean(errors.relationship_comments)}
                    errorMessage={errors.relationship_comments?.message}
                >
                    <Controller
                        name="relationship_comments"
                        control={control}
                        defaultValue={data?.relationship_comments || ''}
                        render={({ field }) =>
                            <Input
                                type="text"
                                {...field}
                            />
                        }
                    />
                </FormItem>

                <FormItem
                    label="SSN"
                    invalid={Boolean(errors.relationship_ssn)}
                    errorMessage={errors.relationship_ssn?.message}
                >
                    <Controller
                        name="relationship_ssn"
                        control={control}
                        defaultValue={data?.relationship_ssn || ''}
                        render={({ field }) =>
                            <Input
                                type="text"
                                {...field}
                            />
                        }
                    />
                </FormItem>

                <FormItem
                    label="Nationality"
                    invalid={Boolean(errors.relation_nationality)}
                    errorMessage={errors.relation_nationality?.message}
                >
                    <Controller
                        name="relation_nationality"
                        control={control}
                        defaultValue={data?.relation_nationality || ''}
                        render={({ field }) =>
                            <Input
                                type="text"
                                {...field}
                            />
                        }
                    />
                </FormItem>

                <FormItem
                    label="Passport Issue Date"
                    invalid={Boolean(errors.relation_passport_issue_date)}
                    errorMessage={errors.relation_passport_issue_date?.message}
                >
                    <Controller
                        name="relation_passport_issue_date"
                        control={control}
                        defaultValue={data?.relation_passport_issue_date || ''}
                        render={({ field }) =>
                            <Input
                                type="date"
                                {...field}
                            />
                        }
                    />
                </FormItem>

                <FormItem
                    label="Passport Expiry Date"
                    invalid={Boolean(errors.relation_passport_expiry_date)}
                    errorMessage={errors.relation_passport_expiry_date?.message}
                >
                    <Controller
                        name="relation_passport_expiry_date"
                        control={control}
                        defaultValue={data?.relation_passport_expiry_date || ''}
                        render={({ field }) =>
                            <Input
                                type="date"
                                {...field}
                            />
                        }
                    />
                </FormItem>

                <FormItem
                    label="Place of Birth"
                    invalid={Boolean(errors.relation_place_of_birth)}
                    errorMessage={errors.relation_place_of_birth?.message}
                >
                    <Controller
                        name="relation_place_of_birth"
                        control={control}
                        defaultValue={data?.relation_place_of_birth || ''}
                        render={({ field }) =>
                            <Input
                                type="text"
                                {...field}
                            />
                        }
                    />
                </FormItem>

                <FormItem
                    label="ECNR Required"
                    invalid={Boolean(errors.relation_ecnr_required)}
                    errorMessage={errors.relation_ecnr_required?.message}
                >
                    <Controller
                        name="relation_ecnr_required"
                        control={control}
                        defaultValue={data?.relation_ecnr_required || ''}
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

export default DetailSection
