import Card from '@/components/ui/Card'
import Input from '@/components/ui/Input'
import { FormItem } from '@/components/ui/Form'
import { Controller } from 'react-hook-form'
import type { FormSectionBaseProps } from '../types'

type CorporateBankProps = FormSectionBaseProps & {
    data?: Record<string, any>
}

const CorporateBank = ({ control, errors, data }: CorporateBankProps) => {
    return (
        <Card>
            <h4 className="mb-6">Corporate Bank</h4>
            <div className="grid md:grid-cols-2 gap-4">
                <FormItem
                    label="Bank Name"
                    invalid={Boolean(errors.bank_name)}
                    errorMessage={errors.bank_name?.message}>
                    <Controller
                        name="bank_name"
                        control={control}
                        defaultValue={data?.bank_name || ''}
                        render={({ field }) =>
                            <Input
                                type="text"
                                {...field}
                            />
                        }
                    />
                </FormItem>

                <FormItem label="Bank Address" invalid={Boolean(errors.bank_address)} errorMessage={errors.bank_address?.message}>
                    <Controller name="bank_address" control={control} defaultValue={data?.bank_address || ''} render={({ field }) => <Input type="text" {...field} />} />
                </FormItem>

                <FormItem label="Branch Name" invalid={Boolean(errors.branch_name)} errorMessage={errors.branch_name?.message}>
                    <Controller name="branch_name" control={control} defaultValue={data?.branch_name || ''} render={({ field }) => <Input type="text" {...field} />} />
                </FormItem>

                <FormItem label="Account #" invalid={Boolean(errors.account_number)} errorMessage={errors.account_number?.message}>
                    <Controller name="account_number" control={control} defaultValue={data?.account_number || ''} render={({ field }) => <Input type="text" {...field} />} />
                </FormItem>

                <FormItem label="Name of Account Holder" invalid={Boolean(errors.account_holder_name)} errorMessage={errors.account_holder_name?.message}>
                    <Controller name="account_holder_name" control={control} defaultValue={data?.account_holder_name || ''} render={({ field }) => <Input type="text" {...field} />} />
                </FormItem>

                <FormItem label="Sort Code" invalid={Boolean(errors.sort_code)} errorMessage={errors.sort_code?.message}>
                    <Controller name="sort_code" control={control} defaultValue={data?.sort_code || ''} render={({ field }) => <Input type="text" {...field} />} />
                </FormItem>

                <FormItem label="SWIFT Code" invalid={Boolean(errors.swift_code)} errorMessage={errors.swift_code?.message}>
                    <Controller name="swift_code" control={control} defaultValue={data?.swift_code || ''} render={({ field }) => <Input type="text" {...field} />} />
                </FormItem>

                <FormItem label="Bank URL" invalid={Boolean(errors.bank_url)} errorMessage={errors.bank_url?.message}>
                    <Controller name="bank_url" control={control} defaultValue={data?.bank_url || ''} render={({ field }) => <Input type="text" {...field} />} />
                </FormItem>

                <FormItem label="Country of the Bank" invalid={Boolean(errors.country_of_bank)} errorMessage={errors.country_of_bank?.message}>
                    <Controller name="country_of_bank" control={control} defaultValue={data?.country_of_bank || ''} render={({ field }) => <Input type="text" {...field} />} />
                </FormItem>

                <FormItem label="Bank Phone #" invalid={Boolean(errors.bank_phone_number)} errorMessage={errors.bank_phone_number?.message}>
                    <Controller name="bank_phone_number" control={control} defaultValue={data?.bank_phone_number || ''} render={({ field }) => <Input type="text" {...field} />} />
                </FormItem>

                <FormItem label="Contact Person" invalid={Boolean(errors.contact_person)} errorMessage={errors.contact_person?.message}>
                    <Controller name="contact_person" control={control} defaultValue={data?.contact_person || ''} render={({ field }) => <Input type="text" {...field} />} />
                </FormItem>

                <FormItem label="Account Type" invalid={Boolean(errors.account_type)} errorMessage={errors.account_type?.message}>
                    <Controller name="account_type" control={control} defaultValue={data?.account_type || ''} render={({ field }) => <Input type="text" {...field} />} />
                </FormItem>

                <FormItem label="Currency" invalid={Boolean(errors.currency)} errorMessage={errors.currency?.message}>
                    <Controller name="currency" control={control} defaultValue={data?.currency || ''} render={({ field }) => <Input type="text" {...field} />} />
                </FormItem>

                <FormItem label="Salary Account" invalid={Boolean(errors.salary_account)} errorMessage={errors.salary_account?.message}>
                    <Controller name="salary_account" control={control} defaultValue={data?.salary_account || ''} render={({ field }) => <Input type="text" {...field} />} />
                </FormItem>

                <FormItem label="IFS No." invalid={Boolean(errors.ifs_number)} errorMessage={errors.ifs_number?.message}>
                    <Controller name="ifs_number" control={control} defaultValue={data?.ifs_number || ''} render={({ field }) => <Input type="text" {...field} />} />
                </FormItem>
            </div>
        </Card>
    )
}

export default CorporateBank 
