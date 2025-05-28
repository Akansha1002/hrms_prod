export type AppraisalKRA = {
    docstatus: number
    kra: string
    per_weightage: number
    goal_completion: number
    goal_score: number
}

export type SelfRating = {
    docstatus: number
    criteria: string
    per_weightage: number
    rating: number
}

export type AppraisalData = {
    name?: string
    docstatus: number
    employee: string
    employee_name: string
    employee_image?: string
    company: string
    status: string
    appraisal_cycle: string
    appraisal_template?: string
    rate_goals_manually?: boolean
    goal_score_percentage?: number
    final_score?: number
    total_score?: number
    avg_feedback_score?: number
    self_score?: number
    reflections?: string
    appraisal_kra?: AppraisalKRA[]
    goals?: any[]
    self_ratings?: SelfRating[]
    creation?: string
    modified?: string
}

export type AppraisalFilter = {
    status: string
}

export type GetAppraisalListResponse = {
    data: AppraisalData[]
    total: number
}
