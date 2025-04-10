export type ProofSubmissionListData = {
    id: string
    employee: string
    employee_name?: string
    payroll_period: string
    status: string
}

export type GetProofSubmissionListResponse = {
    data: ProofSubmissionListData
}

export type Filter = {
    status: string
}
