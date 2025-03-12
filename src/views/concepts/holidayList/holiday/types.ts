export type HolidayTableData = {
    date: string,
    description: string
    reason: string
}

export type HolidayForm = {
    reason: string
    date: string
    status: string
    compensationDate: string
}

export type SelectedCell = {
    type: string
} & Partial<HolidayForm>