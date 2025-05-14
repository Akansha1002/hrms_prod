import ApiService from "./ApiService";

export async function apiGetCostCenterList<T, U extends Record<string, unknown>>({
    params: U,
}: U) {
    return ApiService.fetchDataWithAxios<T>({
        url: 'resource/Cost Center',
        method: 'get',

    })
} 