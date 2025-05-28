import Card from '@/components/ui/Card'
import Input from '@/components/ui/Input'
import { FormItem } from '@/components/ui/Form'
import { Controller } from 'react-hook-form'
import { FormSectionBaseProps } from '../types'

type EducationDetailsProps = FormSectionBaseProps & {
    data?: Record<string, any>
}

const FormSection = ({ control, errors, data }: EducationDetailsProps) => {
    return (
        <Card>
            <h4 className="mb-6">Education Details</h4>
            <div className="grid md:grid-cols-2 gap-4">
                <FormItem
                    label="Type of Establishment"
                    invalid={Boolean(errors.type_of_establishment)}
                    errorMessage={errors.type_of_establishment?.message}
                >
                    <Controller
                        name="type_of_establishment"
                        control={control}
                        defaultValue={data?.type_of_establishment || ''}
                        render={({ field }) =>
                            <Input
                                type="text"
                                {...field}
                            />
                        }
                    />
                </FormItem>
                <FormItem
                    label="Name of Establishment"
                    invalid={Boolean(errors.name_of_establishment)}
                    errorMessage={errors.name_of_establishment?.message}
                >
                    <Controller
                        name="name_of_establishment"
                        control={control}
                        defaultValue={data?.name_of_establishment || ''}
                        render={({ field }) =>
                            <Input
                                type="text"
                                {...field}
                            />
                        }
                    />
                </FormItem>
                <FormItem
                    label="Discipline"
                    invalid={Boolean(errors.discipline)}
                    errorMessage={errors.discipline?.message}
                >
                    <Controller
                        name="discipline"
                        control={control}
                        defaultValue={data?.discipline || ''}
                        render={({ field }) =>
                            <Input
                                type="text"
                                {...field}
                            />
                        }
                    />
                </FormItem>
                <FormItem
                    label="Passing Year"
                    invalid={Boolean(errors.passing_year)}
                    errorMessage={errors.passing_year?.message}
                >
                    <Controller
                        name="passing_year"
                        control={control}
                        defaultValue={data?.passing_year || ''}
                        render={({ field }) =>
                            <Input
                                type="text"
                                {...field}
                            />
                        }
                    />
                </FormItem>
                <FormItem
                    label="Grade"
                    invalid={Boolean(errors.grade)}
                    errorMessage={errors.grade?.message}
                >
                    <Controller
                        name="grade"
                        control={control}
                        defaultValue={data?.grade || ''}
                        render={({ field }) =>
                            <Input
                                type="text"
                                {...field}
                            />
                        }
                    />
                </FormItem>
                <FormItem
                    label="Level"
                    invalid={Boolean(errors.level)}
                    errorMessage={errors.level?.message}
                >
                    <Controller
                        name="level"
                        control={control}
                        defaultValue={data?.level || ''}
                        render={({ field }) =>
                            <Input
                                type="text"
                                {...field}
                            />
                        }
                    />
                </FormItem>
                <FormItem
                    label="Subject"
                    invalid={Boolean(errors.subject)}
                    errorMessage={errors.subject?.message}
                >
                    <Controller
                        name="subject"
                        control={control}
                        defaultValue={data?.subject || ''}
                        render={({ field }) =>
                            <Input
                                type="text"
                                {...field}
                            />
                        }
                    />
                </FormItem>
                <FormItem
                    label="Major Field"
                    invalid={Boolean(errors.major_field)}
                    errorMessage={errors.major_field?.message}
                >
                    <Controller
                        name="major_field"
                        control={control}
                        defaultValue={data?.major_field || ''}
                        render={({ field }) =>
                            <Input
                                type="text"
                                {...field}
                            />
                        }
                    />
                </FormItem>
                <FormItem
                    label="Minor Field"
                    invalid={Boolean(errors.minor_field)}
                    errorMessage={errors.minor_field?.message}
                >
                    <Controller
                        name="minor_field"
                        control={control}
                        defaultValue={data?.minor_field || ''}
                        render={({ field }) =>
                            <Input
                                type="text"
                                {...field}
                            />
                        }
                    />
                </FormItem>
                <FormItem
                    label="Affiliated To"
                    invalid={Boolean(errors.affiliated_to)}
                    errorMessage={errors.affiliated_to?.message}
                >
                    <Controller
                        name="affiliated_to"
                        control={control}
                        defaultValue={data?.affiliated_to || ''}
                        render={({ field }) =>
                            <Input
                                type="text"
                                {...field}
                            />
                        }
                    />
                </FormItem>
                <FormItem
                    label="Address of Institute"
                    invalid={Boolean(errors.address_of_institute)}
                    errorMessage={errors.address_of_institute?.message}
                >
                    <Controller
                        name="address_of_institute"
                        control={control}
                        defaultValue={data?.address_of_institute || ''}
                        render={({ field }) =>
                            <Input
                                type="text"
                                {...field}
                            />
                        }
                    />
                </FormItem>
                <FormItem
                    label="Attended From"
                    invalid={Boolean(errors.attended_from)}
                    errorMessage={errors.attended_from?.message}
                >
                    <Controller
                        name="attended_from"
                        control={control}
                        defaultValue={data?.attended_from || ''}
                        render={({ field }) =>
                            <Input
                                type="date"
                                {...field}
                            />
                        }
                    />
                </FormItem>
                <FormItem
                    label="Attended To"
                    invalid={Boolean(errors.attended_to)}
                    errorMessage={errors.attended_to?.message}
                >
                    <Controller
                        name="attended_to"
                        control={control}
                        defaultValue={data?.attended_to || ''}
                        render={({ field }) =>
                            <Input
                                type="date"
                                {...field}
                            />
                        }
                    />
                </FormItem>
                <FormItem
                    label="Company Sponsored"
                    invalid={Boolean(errors.company_sponsored)}
                    errorMessage={errors.company_sponsored?.message}
                >
                    <Controller
                        name="company_sponsored"
                        control={control}
                        defaultValue={data?.company_sponsored || ''}
                        render={({ field }) =>
                            <Input
                                type="text"
                                {...field}
                            />
                        }
                    />
                </FormItem>
                <FormItem
                    label="Amount"
                    invalid={Boolean(errors.amount)}
                    errorMessage={errors.amount?.message}
                >
                    <Controller
                        name="amount"
                        control={control}
                        defaultValue={data?.amount || ''}
                        render={({ field }) =>
                            <Input
                                type="text"
                                {...field}
                            />
                        }
                    />
                </FormItem>
                <FormItem
                    label="Currency"
                    invalid={Boolean(errors.currency)}
                    errorMessage={errors.currency?.message}
                >
                    <Controller
                        name="currency"
                        control={control}
                        defaultValue={data?.currency || ''}
                        render={({ field }) =>
                            <Input
                                type="text"
                                {...field}
                            />
                        }
                    />
                </FormItem>
                <FormItem
                    label="Reimbursement Date"
                    invalid={Boolean(errors.reimbursement_data)}
                    errorMessage={errors.reimbursement_data?.message}
                >
                    <Controller
                        name="reimbursement_data"
                        control={control}
                        defaultValue={data?.reimbursement_data || ''}
                        render={({ field }) =>
                            <Input
                                type="date"
                                {...field}
                            />
                        }
                    />
                </FormItem>
                <FormItem
                    label="Explain Breaks During Education"
                    invalid={Boolean(errors.explain_breaks_during_education)}
                    errorMessage={errors.explain_breaks_during_education?.message}
                >
                    <Controller
                        name="explain_breaks_during_education"
                        control={control}
                        defaultValue={data?.explain_breaks_during_education || ''}
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

export default FormSection
