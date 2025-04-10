import ApiService from "./ApiService";

export async function apiGetEmploymentTypeList<T, U extends Record<string, unknown>>({
    params: U,
}: U) {
    return ApiService.fetchDataWithAxios<T>({
        url: 'resource/Employment Type',
        method: 'get',

    })
} 