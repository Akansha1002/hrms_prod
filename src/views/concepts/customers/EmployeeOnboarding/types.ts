import type { Control, FieldErrors } from 'react-hook-form'

export type OnboardingData = {
    formName: string
    status: string
}

export type EmployeeOnboardingSchema = OnboardingData

export type FormSectionBaseProps = {
    control: Control<EmployeeOnboardingSchema>
    errors: FieldErrors<EmployeeOnboardingSchema>
}