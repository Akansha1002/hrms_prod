import type { Control, FieldErrors, UseFormSetValue } from 'react-hook-form'

export type EmployeeSectionFields = {
    employee: string
    currency: string
    submission_date: string
    payroll_period: string
    company: string
}

export type ExemptionProofsField = {
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

// export type TaxExemptionProof = {
//     exemption_sub_category: string
//     exemption_category: string
//     max_amount: number
//     amount: number
//     type_of_proof: string
//     attach_proof: string
// }

export type ProofSubmissionData = {
    employee: string
    currency: string
    payroll_period: string
    submission_date: string
    company: string
    house_rent_payment_amount: string
    rented_in_metro_city: boolean
    tax_exemption_proofs: ExemptionProofsField[]
}

export type ProofSubmissionFormSchema = EmployeeSectionFields &
    HouseRentAllowanceField & {
        tax_exemption_proofs: ExemptionProofsField[]
    }

export type FormSectionBaseProps = {
    control: Control<ProofSubmissionFormSchema>
    errors: FieldErrors<ProofSubmissionFormSchema>
    // setValue: UseFormSetValue<ProofSubmissionFormSchema>
}