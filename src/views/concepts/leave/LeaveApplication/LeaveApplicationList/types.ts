export type LeaveApplicationData = {
    id: string
    name: string
    employee: string
    employee_name?: string
    leave_type?: string
    company?: string
    department?: string
    from_date?: string
    to_date?: string
    half_day?: boolean
    total_leave_days: string
    description?: string
    leave_approver?: string
    posting_date?: string
    custom_work_reassign_to?: string
    custom_employees_to_be_notified?: string
    status?: string
}

export type GetLeaveApplicationListResponse = {
    data: LeaveApplicationData
    total: number
}

export type Filter = {
    status: string
}
