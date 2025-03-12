import Card from '@/components/ui/Card'
import Input from '@/components/ui/Input'
import { FormItem } from '@/components/ui/Form'
import { Controller } from 'react-hook-form'
import { FormSectionBaseProps } from '../types'

type EmploymentDetailsProps = FormSectionBaseProps & {
    data?: Record<string, any>
}


const EmploymentDetails = ({ control, errors, data }: EmploymentDetailsProps) => {
    return (
        <Card>
            <h4 className="mb-6">Past Employment Details</h4>
            <div className="grid md:grid-cols-2 gap-4">
                <FormItem
                    label="Company Name"
                    invalid={Boolean(errors.company_name)}
                    errorMessage={errors.company_name?.message}
                >
                    <Controller
                        name="company_name"
                        control={control}
                        defaultValue={data?.company_name || ''}
                        render={({ field }) => <Input type="text" {...field} />}
                    />
                </FormItem>

                <FormItem
                    label="Address"
                    invalid={Boolean(errors.address)}
                    errorMessage={errors.address?.message}
                >
                    <Controller
                        name="address"
                        control={control}
                        defaultValue={data?.address || ''}
                        render={({ field }) => <Input type="text" {...field} />}
                    />
                </FormItem>

                <FormItem
                    label="From Date"
                    invalid={Boolean(errors.from_date)}
                    errorMessage={errors.from_date?.message}
                >
                    <Controller
                        name="from_date"
                        control={control}
                        defaultValue={data?.from_date || ''}
                        render={({ field }) => <Input type="date" {...field} />}
                    />
                </FormItem>

                <FormItem
                    label="To Date"
                    invalid={Boolean(errors.to_date)}
                    errorMessage={errors.to_date?.message}
                >
                    <Controller
                        name="to_date"
                        control={control}
                        defaultValue={data?.to_date || ''}
                        render={({ field }) => <Input type="date" {...field} />}
                    />
                </FormItem>

                <FormItem
                    label="Job Title"
                    invalid={Boolean(errors.job_title)}
                    errorMessage={errors.job_title?.message}
                >
                    <Controller
                        name="job_title"
                        control={control}
                        defaultValue={data?.job_title || ''}
                        render={({ field }) => <Input type="text" {...field} />}
                    />
                </FormItem>

                <FormItem
                    label="Salary on Leaving"
                    invalid={Boolean(errors.salary_on_leaving)}
                    errorMessage={errors.salary_on_leaving?.message}
                >
                    <Controller
                        name="salary_on_leaving"
                        control={control}
                        defaultValue={data?.salary_on_leaving || ''}
                        render={({ field }) => <Input type="text" {...field} />}
                    />
                </FormItem>

                {/* <FormItem
                    label="Currency"
                    invalid={Boolean(errors.currency)}
                    errorMessage={errors.currency?.message}
                >
                    <Controller
                        name="currency"
                        control={control}
                        defaultValue={data?.currency || ''}
                        render={({ field }) => <Input type="text" {...field} />}
                    />
                </FormItem> */}

                <FormItem
                    label="Designation on Joining"
                    invalid={Boolean(errors.designation_on_joining)}
                    errorMessage={errors.designation_on_joining?.message}
                >
                    <Controller
                        name="designation_on_joining"
                        control={control}
                        defaultValue={data?.designation_on_joining || ''}
                        render={({ field }) => <Input type="text" {...field} />}
                    />
                </FormItem>

                <FormItem
                    label="Number of People Reporting"
                    invalid={Boolean(errors.number_of_people_reporting)}
                    errorMessage={errors.number_of_people_reporting?.message}
                >
                    <Controller
                        name="number_of_people_reporting"
                        control={control}
                        defaultValue={data?.number_of_people_reporting || ''}
                        render={({ field }) => <Input type="text" {...field} />}
                    />
                </FormItem>

                <FormItem
                    label="Designation on Leaving"
                    invalid={Boolean(errors.designation_on_leaving)}
                    errorMessage={errors.designation_on_leaving?.message}
                >
                    <Controller
                        name="designation_on_leaving"
                        control={control}
                        defaultValue={data?.designation_on_leaving || ''}
                        render={({ field }) => <Input type="text" {...field} />}
                    />
                </FormItem>

                <FormItem
                    label="Industry Type"
                    invalid={Boolean(errors.industry_type)}
                    errorMessage={errors.industry_type?.message}
                >
                    <Controller
                        name="industry_type"
                        control={control}
                        defaultValue={data?.industry_type || ''}
                        render={({ field }) => <Input type="text" {...field} />}
                    />
                </FormItem>

                <FormItem
                    label="Contact Number"
                    invalid={Boolean(errors.contact_number)}
                    errorMessage={errors.contact_number?.message}
                >
                    <Controller
                        name="contact_number"
                        control={control}
                        defaultValue={data?.contact_number || ''}
                        render={({ field }) => <Input type="text" {...field} />}
                    />
                </FormItem>

                <FormItem
                    label="Roles"
                    invalid={Boolean(errors.roles)}
                    errorMessage={errors.roles?.message}
                >
                    <Controller
                        name="roles"
                        control={control}
                        defaultValue={data?.roles || ''}
                        render={({ field }) => <Input type="text" {...field} />}
                    />
                </FormItem>

                <FormItem
                    label="Key Experience"
                    invalid={Boolean(errors.key_experience)}
                    errorMessage={errors.key_experience?.message}
                >
                    <Controller
                        name="key_experience"
                        control={control}
                        defaultValue={data?.key_experience || ''}
                        render={({ field }) => <Input type="text" {...field} />}
                    />
                </FormItem>

                <FormItem
                    label="Reason for Leaving"
                    invalid={Boolean(errors.reason_for_leaving)}
                    errorMessage={errors.reason_for_leaving?.message}
                >
                    <Controller
                        name="reason_for_leaving"
                        control={control}
                        defaultValue={data?.reason_for_leaving || ''}
                        render={({ field }) => <Input type="text" {...field} />}
                    />
                </FormItem>

                <FormItem
                    label="Breaks in Career"
                    invalid={Boolean(errors.breaks_in_career)}
                    errorMessage={errors.breaks_in_career?.message}
                >
                    <Controller
                        name="breaks_in_career"
                        control={control}
                        defaultValue={data?.breaks_in_career || ''}
                        render={({ field }) => <Input type="text" {...field} />}
                    />
                </FormItem>

                <FormItem
                    label="No. of Months Experience"
                    invalid={Boolean(errors.number_of_months_experience)}
                    errorMessage={errors.number_of_months_experience?.message}
                >
                    <Controller
                        name="number_of_months_experience"
                        control={control}
                        defaultValue={data?.number_of_months_experience || ''}
                        render={({ field }) => <Input type="text" {...field} />}
                    />
                </FormItem>
            </div>
        </Card>
    )
}

export default EmploymentDetails
