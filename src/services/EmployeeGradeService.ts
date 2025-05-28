import ApiService from "./ApiService";

export async function apiGetGradeList<T, U extends Record<string, unknown>>({
    params: U,
}: U) {
    return ApiService.fetchDataWithAxios<T>({
        url: 'resource/Employee Grade',
        method: 'get',

    })
} 