import type { Control, FieldErrors } from 'react-hook-form'

export type BankDetailsFields = {
    bank_name: string;
    bank_address?: string;
    branch_name?: string;
    bank_url?: string;
    country_of_bank?: string;
    bank_phone_number?: string;
    contact_person?: string;
    account_number: string;
    account_holder_name: string;
    sort_code?: string;
    swift_code?: string;
    account_type: string;
    currency?: string;
    salary_account?: string;
    ifs_number?: string;
    employee_number: string;
}

export type GetBankDetailResponse = {
    data: BankDetailsFields
}

export type BankDetailsSchema = BankDetailsFields

export type FormSectionBaseProps = {
    control: Control<BankDetailsSchema>
    errors: FieldErrors<BankDetailsSchema>
}
