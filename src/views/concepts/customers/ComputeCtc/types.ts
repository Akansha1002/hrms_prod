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

export type SalaryStructureComponents = {
    id:string
    name: string
    salary_component: string
    abbr: string
    amount: number
    year_to_date: number
    is_recurring_additional_salary: number
    statistical_component: number
    depends_on_payment_days: number
    exempted_from_income_tax: number
    is_tax_applicable: number
    is_flexible_benefit: number
    variable_based_on_taxable_salary: number
    do_not_include_in_total: number
    deduct_full_tax_on_selected_payroll_date: number
    condition: string
    amount_based_on_formula: number
    formula: string
    default_amount: number
    additional_amount: number
    tax_on_flexible_benefit: number
    tax_on_additional_salary: number

    // additional add 
    previous_employer: string
    proposed_salary: string
    increased_amount: string
    exchange_rate: string
    monthly_amount: string
    base_currency: string
    currency: string
    payroll_frequency: string
}

export type SalaryStructureDetails = {
    id: string
    name: string
    currency: string
    payroll_frequency: string

    earnings: SalaryStructureComponents[]
    deductions: SalaryStructureComponents[]
}

export type GetSalaryStructureResponse ={
    data: SalaryStructureDetails
}

export type ComputeCtcSchema = JoiningBonusFields

export type FormSectionBaseProps = {
    control: Control<ComputeCtcSchema>
    errors: FieldErrors<ComputeCtcSchema>
}