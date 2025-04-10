export type HolidayTableData = {
    holiday_date: string,
    description: string
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

export type HolidayListDetailResponse = {
    data: {
        holidays: HolidayTableData
    }
}