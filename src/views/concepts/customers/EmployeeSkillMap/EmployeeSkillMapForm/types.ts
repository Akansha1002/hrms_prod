import type { Control, FieldErrors } from 'react-hook-form'

export type EmployeeInfoFields = {
    employee: string
}

export type SkillDetailsTableData = {
    skill: string
    proficiency: number
    evaluation_date?: string
}

export type TrainingDetailsTableData = {
    training?: string
    training_date?: string
}

export type EmployeeSkillMapFormSchema = EmployeeInfoFields & {
    employee_skills: SkillDetailsTableData[]
    trainings: TrainingDetailsTableData[]
}

export type FormSectionBaseProps = {
    control: Control<EmployeeSkillMapFormSchema>
    errors: FieldErrors<EmployeeSkillMapFormSchema>
}