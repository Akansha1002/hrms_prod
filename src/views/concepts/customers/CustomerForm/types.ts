import type { Control, FieldErrors, UseFormSetValue } from 'react-hook-form'

export type PersonalInfoFields = {
    employee?: string | null
    // loginId?: string | null
    personal_email?: string | null
    salutation?: string | null
    first_name: string
    middle_name?: string | null
    last_name: string
    gender?: string | null
    date_of_birth: string
    user_id?: string | null
}

export type OrganizationFields = {
    date_of_joining: string
    effectiveFrom?: string | null
    position?: string | null
    orgStructure?: string | null
    custom_location?: string | null
    department?: string | null
    designation?: string | null
    grade?: string | null
    payroll_cost_center?: string | null
    // officialEmail?: string | null
    user_email?: string | null
    custom_reporting_manager?: string | null
    reports_to?: string | null
    custom_functional_manager?: string | null
    custom_peoples_manager?: string | null
}

export type ProfileImageFields = {
    image?: string | File | null
}

export type AdditionalInformationFields = {
    calendar?: string | null
    custom_attendance?: string | null
    custom_shift_type?: string | null
    custom_shift_group?: string | null
    custom_employment_status?: string | null
    final_confirmation_date?: string | null
    custom_full_part_time?: string | null
    custom_contract_type?: string | null
    contract_end_date?: string | null
    custom_contractor?: string | null
    custom_experience_in_category?: string | null
    custom_experience_in_months?: string | null
    notice_number_of_days?: string | null
    custom_secretary?: string | null
    reEmployed?: boolean
    custom_old_employee_number?: string | null
    systemUser?: boolean
    originalHireDate?: string | null
}

export type PayRollfields = {
    pan_number?: string | null
    pfApplicable?: boolean
    custom_pf_number?: string | null
    esiApplicable?: boolean
    custom_esi_number?: string | null
    ptApplicable?: boolean
    custom_pt_location?: string | null
    custom_gl_code?: string | null
    salary_mode?: string | null
    custom_applied_from?: string | null
    custom_pay_group?: string | null
}

export type EmployeeFormSchema = PersonalInfoFields &
    OrganizationFields &
    ProfileImageFields &
    AdditionalInformationFields &
    PayRollfields

export type FormSectionBaseProps = {
    control: Control<EmployeeFormSchema>
    errors: FieldErrors<EmployeeFormSchema>
    setValue:UseFormSetValue<EmployeeFormSchema>
}
