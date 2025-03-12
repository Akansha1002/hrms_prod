import type { Control, FieldErrors } from 'react-hook-form'

export type JoiningBonusFields = {
    joiningBonus: string
}

export type SalaryData = {
    id: string
    component: string
    previousEmployer: string
    period: string
    proposedSalary: string
    increasedAmount: string
    currency: string
    exchangeRate: string
    monthlyAmount: string
    baseCurrency: string
}

export type ComputeCtcSchema = JoiningBonusFields

export type FormSectionBaseProps = {
    control: Control<ComputeCtcSchema>
    errors: FieldErrors<ComputeCtcSchema>
}