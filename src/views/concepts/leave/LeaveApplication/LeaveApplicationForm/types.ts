import type { Control, FieldErrors } from 'react-hook-form'

export type AllocatedLeaveTableData = {
    leave_type: string
    total_leaves_allocated: string
    expired: string
    used_leaves: string
    leaves_pending_approval: string
    available_leaves: string
}

export type GetAllocatedLeaveTableData = {
    data: AllocatedLeaveTableData
}

export type EmployeeInfoFields = {
    employee: string
    employee_name?: string
    leave_type?: string
    company?: string
}

export type ReasonFields = {
    from_date?: string
    to_date?: string
    half_day?: boolean
    total_leave_days?: string
    description?: string
}

export type ApprovalFields = {
    leave_approver?: string
    posting_date?: string
    status?: string
    custom_work_reassign_to?: string
    custom_employees_to_be_notified?: string
}

export type LeaveApplicationFormSchema = EmployeeInfoFields &
    ReasonFields &
    ApprovalFields

export type FormSectionBaseProps = {
    control: Control<LeaveApplicationFormSchema>
    errors: FieldErrors<LeaveApplicationFormSchema>
}