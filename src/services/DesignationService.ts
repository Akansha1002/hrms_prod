import ApiService from "./ApiService";

export async function apiGetDesignationList<T, U extends Record<string, unknown>>({
    params: U,
}: U) {
    return ApiService.fetchDataWithAxios<T>({
        url: 'resource/Designation',
        method: 'get',

    })
} 