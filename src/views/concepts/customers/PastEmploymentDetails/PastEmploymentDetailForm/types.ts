import type { Control, FieldErrors } from 'react-hook-form'

export type PastEmploymentdetailFields = {
    employee_number?: string;
    company_name?: string;
    from_date?: string;
    to_date?: string;
    job_title?: string;
    salary_on_leaving?: string;
    contact_number?: string;
    roles?: string;
    breaks_in_career?: string;
    address?: string;
    designation_on_joining?: string;
    designation_on_leaving?: string;
    number_of_people_reporting?: string;
    industry_type?: string;
    key_experience?: string;
    reason_for_leaving?: string;
    number_of_months_experience?: string;
}

export type GetPastEmploymentDetailResponse = {
    data: PastEmploymentdetailFields
}

export type PastEmploymentDetailsSchema = PastEmploymentdetailFields

export type FormSectionBaseProps = {
    control: Control<PastEmploymentDetailsSchema>
    errors: FieldErrors<PastEmploymentDetailsSchema>
}
