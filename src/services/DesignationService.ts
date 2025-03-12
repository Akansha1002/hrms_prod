import ApiService from "./ApiService";

export async function apiGetDesignationList<T, U extends Record<string, unknown>>({
    params: U,
}: U) {
    return ApiService.fetchDataWithAxios<T>({
        url: 'http://159.65.147.182:8000/api/resource/Designation',
        method: 'get',

    })
} 