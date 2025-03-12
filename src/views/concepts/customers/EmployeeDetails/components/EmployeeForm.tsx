import Card from '@/components/ui/Card'
import Input from '@/components/ui/Input'
import { FormItem } from '@/components/ui/Form'
import { Controller } from 'react-hook-form'
import type { FormSectionBaseProps } from '../types'

type EmployeeFormProps = FormSectionBaseProps & {
    data?: Record<string, any>
}

const EmployeeForm = ({ control, errors, data }: EmployeeFormProps) => {
    return (
        <Card>
            <h4 className="mb-6">Employee Details</h4>
            <div className="grid md:grid-cols-2 gap-4">
                <FormItem label="Title" invalid={Boolean(errors.title)} errorMessage={errors.title?.message}>
                    <Controller name="title" control={control}
                        defaultValue={data?.title || ''} render={({ field }) => <Input type="text" {...field} />} />
                </FormItem>
                <FormItem label="Gender" invalid={Boolean(errors.gender)} errorMessage={errors.gender?.message}>
                    <Controller name="gender" control={control}
                        defaultValue={data?.gender || ''} render={({ field }) => <Input type="text" {...field} />} />
                </FormItem>
                <FormItem label="Surname" invalid={Boolean(errors.surname)} errorMessage={errors.surname?.message}>
                    <Controller name="surname" control={control}
                        defaultValue={data?.surname || ''} render={({ field }) => <Input type="text" {...field} />} />
                </FormItem>
                <FormItem label="First Name" invalid={Boolean(errors.first_name)} errorMessage={errors.first_name?.message}>
                    <Controller name="first_name" control={control}
                        defaultValue={data?.first_name || ''} render={({ field }) => <Input type="text" {...field} />} />
                </FormItem>
                <FormItem label="Middle Name" invalid={Boolean(errors.middle_name)} errorMessage={errors.middle_name?.message}>
                    <Controller name="middle_name" control={control}
                        defaultValue={data?.middle_name || ''} render={({ field }) => <Input type="text" {...field} />} />
                </FormItem>
                <FormItem label="Known As" invalid={Boolean(errors.known_as)} errorMessage={errors.known_as?.message}>
                    <Controller name="known_as" control={control}
                        defaultValue={data?.known_as || ''} render={({ field }) => <Input type="text" {...field} />} />
                </FormItem>
                <FormItem label="Official Name" invalid={Boolean(errors.official_name)} errorMessage={errors.official_name?.message}>
                    <Controller name="official_name" control={control}
                        defaultValue={data?.official_name || ''} render={({ field }) => <Input type="text" {...field} />} />
                </FormItem>
                <FormItem label="Place of Birth" invalid={Boolean(errors.place_of_birth)} errorMessage={errors.place_of_birth?.message}>
                    <Controller name="place_of_birth" control={control}
                        defaultValue={data?.place_of_birth || ''} render={({ field }) => <Input type="text" {...field} />} />
                </FormItem>
                <FormItem label="State of Birth" invalid={Boolean(errors.state_of_birth)} errorMessage={errors.state_of_birth?.message}>
                    <Controller name="state_of_birth" control={control}
                        defaultValue={data?.state_of_birth || ''} render={({ field }) => <Input type="text" {...field} />} />
                </FormItem>
                <FormItem label="Country of Birth" invalid={Boolean(errors.country_of_birth)} errorMessage={errors.country_of_birth?.message}>
                    <Controller name="country_of_birth" control={control}
                        defaultValue={data?.country_of_birth || ''} render={({ field }) => <Input type="text" {...field} />} />
                </FormItem>
                <FormItem label="Date of Birth" invalid={Boolean(errors.dob)} errorMessage={errors.dob?.message}>
                    <Controller name="dob" control={control}
                        defaultValue={data?.dob || ''} render={({ field }) => <Input type="date" {...field} />} />
                </FormItem>
                <FormItem label="Marital Status" invalid={Boolean(errors.marital_status)} errorMessage={errors.marital_status?.message}>
                    <Controller name="marital_status" control={control}
                        defaultValue={data?.marital_status || ''} render={({ field }) => <Input type="text" {...field} />} />
                </FormItem>
                <FormItem label="Wedding Date" invalid={Boolean(errors.wedding_date)} errorMessage={errors.wedding_date?.message}>
                    <Controller name="wedding_date" control={control}
                        defaultValue={data?.wedding_date || ''} render={({ field }) => <Input type="date" {...field} />} />
                </FormItem>
                <FormItem label="Nationality" invalid={Boolean(errors.nationality)} errorMessage={errors.nationality?.message}>
                    <Controller name="nationality" control={control}
                        defaultValue={data?.nationality || ''} render={({ field }) => <Input type="text" {...field} />} />
                </FormItem>
                <FormItem label="Language" invalid={Boolean(errors.labnguage)} errorMessage={errors.labnguage?.message}>
                    <Controller name="labnguage" control={control}
                        defaultValue={data?.labnguage || ''} render={({ field }) => <Input type="text" {...field} />} />
                </FormItem>
                <FormItem label="Blood Group" invalid={Boolean(errors.blood_group)} errorMessage={errors.blood_group?.message}>
                    <Controller name="blood_group" control={control}
                        defaultValue={data?.blood_group || ''} render={({ field }) => <Input type="text" {...field} />} />
                </FormItem>
                <FormItem label="RH Factor" invalid={Boolean(errors.rh_factor)} errorMessage={errors.rh_factor?.message}>
                    <Controller name="rh_factor" control={control}
                        defaultValue={data?.rh_factor || ''} render={({ field }) => <Input type="text" {...field} />} />
                </FormItem>
                <FormItem label="Physically Challenged" invalid={Boolean(errors.physically_challenged)} errorMessage={errors.physically_challenged?.message}>
                    <Controller name="physically_challenged" control={control}
                        defaultValue={data?.physically_challenged || ''} render={({ field }) => <Input type="text" {...field} />} />
                </FormItem>
                <FormItem label="Disability" invalid={Boolean(errors.disability)} errorMessage={errors.disability?.message}>
                    <Controller name="disability" control={control}
                        defaultValue={data?.permanent_address_1 || ''} render={({ field }) => <Input type="text" {...field} />} />
                </FormItem>
            </div>
        </Card>
    )
}

export default EmployeeForm
