import type { Control, FieldErrors, UseFormSetValue } from 'react-hook-form'

export type EmployeeSectionFields = {
    employee: string
    employee_name?: string | null
    currency: string
    submission_date: string
    payroll_period: string
    company: string
}

export type ExemptionProofsField = {
    no: string
    exemption_sub_category: string
    exemption_category: string
    max_amount: string
    amount: string
    type_of_proof: string
    attach_proof: string
}

export type HouseRentAllowanceField = {
    house_rent_payment_amount: string
    rented_in_metro_city: boolean
    rented_from_date: string
    rented_to_date: string
}

export type TaxExemptionProof = {
    exemption_sub_category: string
    exemption_category: string
    max_amount: number
    amount: number
    type_of_proof: string
    attach_proof: string
}

export type ProofSubmissionData = {
    employee: string
    currency: string
    payroll_period: string
    company: string
    house_rent_payment_amount: number
    rented_in_metro_city: 0 | 1 // assuming 0 = false, 1 = true
    monthly_house_rent: number
    monthly_hra_exemption: number
    total_eligible_hra_exemption: number
    total_actual_amount: number
    exemption_amount: number
    tax_exemption_proofs: TaxExemptionProof[]
}

export type ProofSubmissionFormSchema = EmployeeSectionFields &
    ExemptionProofsField &
    HouseRentAllowanceField

export type FormSectionBaseProps = {
    control: Control<ProofSubmissionFormSchema>
    errors: FieldErrors<ProofSubmissionFormSchema>
    setValue: UseFormSetValue<ProofSubmissionFormSchema>
}