export type HolidayListTableData = {
    holiday_list_name: string
    from_date: string
    to_date: string
    total_holidays: string
}

export type GetHolidayListResponse = {
    data: HolidayListTableData
}