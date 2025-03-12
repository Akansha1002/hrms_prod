import type { Control, FieldErrors } from 'react-hook-form'

export type EducationDetailFields = {
    type_of_establishment?: string;
    name_of_establishment?: string;
    discipline?: string;
    passing_year?: string;
    grade?: string;
    level?: string;
    company_sponsored?: string;
    amount?: string;
    reimbursement_data?: string;
    subject?: string;
    major_field?: string;
    minor_field?: string;
    affiliated_to?: string;
    address_of_institute?: string;
    attended_from?: string;
    attended_to?: string;
    currency?: string;
    explain_breaks_during_education?: string;
    employee_number?: string;
}

export type GetEducationDetailResponse = {
    data: EducationDetailFields
}

export type EducationDetailsSchema = EducationDetailFields

export type FormSectionBaseProps = {
    control: Control<EducationDetailsSchema>
    errors: FieldErrors<EducationDetailsSchema>
}