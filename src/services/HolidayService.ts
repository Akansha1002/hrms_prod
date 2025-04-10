import ApiService from './ApiService'

export async function apiGetHolidayList<T, U extends Record<string, unknown>>({
    params: U,
}: U) {
    return ApiService.fetchDataWithAxios<T>({
        url: 'resource/Holiday List?fields=["*"]',
        method: 'get',
    })
}

export async function apiGetHolidayListDetails<T, U extends Record<string, unknown>>({
    id,
    ...params
}: U) {
    return ApiService.fetchDataWithAxios<T>({
        url: `resource/Holiday List/${id}`,
        method: 'get',
        params,
    })
}


export async function apiGetEmployeeNameList<
    T,
    U extends Record<string, unknown>,
>({ params: U }: U) {
    return ApiService.fetchDataWithAxios<T>({
        url: 'resource/Employee?fields=["name","employee_name"]',
        method: 'get',
    })
}
