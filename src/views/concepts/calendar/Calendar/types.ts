export type CalendarEventParam = {
    id: string
    title: string
    start: string
    eventColor: string
    end?: string
}

export type CalendarEvent = {
    id: string
    title?: string
    start: string
    end?: string
    eventColor: string
}

// export type SelectedCell = {
//     type: string
// } & Partial<CalendarEvent>

export type LeaveRequestFields = {
    naming_series: string
    leave_type: string
    from_date: string
    to_date: string
    description: string
    posting_date: string
    leaveAddress: string
    phoneNo: string
    workReassignTo: string
    employeesToNotify: string
    half_day: boolean
    custom_work_reassign_to: string
    custom_employees_to_be_notified: string
    message: string
}

export type AttendanceDetail = {
    attendance_date: string
    status: string
    extendedProps?: {
        eventColor: string
    }
}

export type SelectedCell = {
    type: string
} & Partial<LeaveRequestFields>

export type LeaveRequestSchema = LeaveRequestFields

export type CalendarEvents = CalendarEvent[]

export type GetCalendarResponse = CalendarEvents

// export type AttendanceEvents = {
//     data: AttendanceDetail
// }
// export type GetCalendarResponse = AttendanceEvents
