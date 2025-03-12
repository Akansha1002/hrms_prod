import type { Control, FieldErrors } from 'react-hook-form'

export type PassportDetailsFields = {
    name_as_in_passport?: string
    passport_number?: string
    place_of_issue?: string
    issue_date?: string
    expiry_renewal_date?: string
    ecnr_required?: string
    date_of_birth?: string
    place_of_birth?: string
    employee_number?: string
}

export type GetPassportDetailResponse = {
    data: PassportDetailsFields
}

export type PassportDetailsSchema = PassportDetailsFields

export type FormSectionBaseProps = {
    control: Control<PassportDetailsSchema>
    errors: FieldErrors<PassportDetailsSchema>
}
