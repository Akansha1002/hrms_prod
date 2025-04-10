import ApiService from "./ApiService";

export async function apiGetDepartmentList<T, U extends Record<string, unknown>>({
    params: U,
}: U) {
    return ApiService.fetchDataWithAxios<T>({
        url: 'resource/Department',
        method: 'get',

    })
} 