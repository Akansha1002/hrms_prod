import type { Control, FieldErrors } from 'react-hook-form'

export type PromotionInfoFields = {
    employee: string
    promotion_date: string
    company?: string
}

export type PromotionDetailsTableData = {
    property?: string
    current?: string
    new?: string
}

export type SalaryDetailsFields = {
    current_ctc?: string
    revised_ctc?: string
}

export type PropertyListData = {
    property: string
    current: string
}

export type GetPropertyListResponse = {
    message: PropertyListData[]
}

export type EmployeePromotionFormSchema = PromotionInfoFields &
    SalaryDetailsFields & {
        promotion_details: PromotionDetailsTableData[]
    }

export type FormSectionBaseProps = {
    control: Control<EmployeePromotionFormSchema>
    errors: FieldErrors<EmployeePromotionFormSchema>
}