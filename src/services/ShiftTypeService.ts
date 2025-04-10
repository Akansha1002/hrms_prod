import ApiService from "./ApiService";

export async function apiGetShiftTypeList<T, U extends Record<string, unknown>>({
    params: U,
}: U) {
    return ApiService.fetchDataWithAxios<T>({
        url: 'resource/Shift Type',
        method: 'get',

    })
} 