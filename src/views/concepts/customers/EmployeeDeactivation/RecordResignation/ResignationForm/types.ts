import type { Control, FieldErrors } from 'react-hook-form'

export type EmployeeInfoFields = {
    employee: string
    date_of_joining: string
    designation: string
    grade: string
    business_unit: string
    department: string
    location: string
    reporting_manager: string
    functional_reporting_to: string
    official_email: string
}

export type ResignationInfoFields = {
    separation_type: string
    resignation_reason: string
    resignation_letter_date: string
    request_relieving_date: string
    actual_relieving_date: string
    notice_period: string
    end_of_notice_period: string
    notice_period_shortfall: string
    next_employer: string
    employee_reason: string
    mailing_address: string
    other_address: string
    personal_email_id: string
    reason_for_do_not_hire: string
}

export type PayrollFields = {
    last_pay_date: string
    last_working_date: string
    salary_hold: string
    payment_advice: string
    recover_shortfall: string
    partial_walve_off_days: string
    shortfall_period_after_walve_off: string
    reason_for_walve_off: string
}

export type ResignationFormSchema = EmployeeInfoFields
    & ResignationInfoFields
    & PayrollFields

export type FormSectionBaseProps = {
    control: Control<ResignationFormSchema>
    errors: FieldErrors<ResignationFormSchema>
}