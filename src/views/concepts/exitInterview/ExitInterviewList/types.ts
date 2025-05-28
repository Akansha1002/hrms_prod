export type ExitInterviewData = {
    name: string
    owner: string
    creation: string
    modified: string
    modified_by: string
    docstatus: number
    idx: number
    naming_series: string
    employee: string
    employee_name: string
    email: string
    company: string
    status: string
    date: string
    department: string | null
    designation: string | null
    reports_to: string | null
    date_of_joining: string
    relieving_date: string
    ref_doctype: string | null
    questionnaire_email_sent: number
    reference_document_name: string | null
    interview_summary: string
    employee_status: string
    amended_from: string | null
}

export type Filter = {
    status?: string
}

export type GetExitInterviewListResponse = {
    data: ExitInterviewData[]
    total: number
}
