export type PerformanceFeedbackListData = {
    employee_name: string
    status: string
    employee: string
    reviewer_name: string
    appraisal_cycle: string
    total_score: string
    id: string
}

export type GetPerformanceFeedbackListResponse = {
    data: PerformanceFeedbackListData
}

export type Filter = {
    status: string
}