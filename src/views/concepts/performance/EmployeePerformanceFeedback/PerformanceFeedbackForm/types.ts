import type { Control, FieldErrors, UseFormSetValue } from 'react-hook-form'

export type EmployeeDetailsFields = {
    employee: string
    reviewer: string
    added_on: string
    company: string
}

export type FeedbackRatingFields = {
    appraisal: string
    total_score?: string
}

export type FeedbackRatingTable = {
    criteria: string
    weightage: string
    rating: string
}

export type FeedbackFields = {
    feedback: string
}


export type PerformanceFeedbackFormSchema = EmployeeDetailsFields
    & FeedbackRatingFields
    & FeedbackFields

export type FormSectionBaseProps = {
    control: Control<PerformanceFeedbackFormSchema>
    errors: FieldErrors<PerformanceFeedbackFormSchema>
}