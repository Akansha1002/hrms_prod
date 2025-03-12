import ApiService from './ApiService'

export async function apiGetHolidayList<T, U extends Record<string, unknown>>({
    params: U,
}: U) {
    return ApiService.fetchDataWithAxios<T>({
        url: 'http://159.65.147.182:8000/api/resource/Holiday List',
        method: 'get',
    })
}

export async function apiGetEmployeeNameList<
    T,
    U extends Record<string, unknown>,
>({ params: U }: U) {
    return ApiService.fetchDataWithAxios<T>({
        url: 'http://159.65.147.182:8000/api/resource/Employee?fields=["name","employee_name"]',
        method: 'get',
    })
}
