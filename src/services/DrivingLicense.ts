import ApiService from '@/services/ApiService'

const API_URL = 'http://159.65.147.182:8000/api/resource/Driving License'

/**
 * Fetch passport details by employee ID
 */
export async function apiGetDrivingLicense<T, U extends Record<string, unknown>>({
    name,
    ...params
}: U) {
    return ApiService.fetchDataWithAxios<T>({
        url: `${API_URL}/${name}`,
        method: 'get',
        params,
    })
}

/**
 * Create new passport details
 */
export async function apiCreateDrivingLicense<T, U extends Record<string, unknown>>(
    data: U) {
    return ApiService.fetchDataWithAxios<T>({
        url: API_URL,
        method: 'post',
        data,
    })
}

/**
 * Update existing passport details
 */
export async function apiUpdateDrivingLicense<T, U extends Record<string, unknown>>(
    name: string,
    data: U) {
    return ApiService.fetchDataWithAxios<T>({
        url: `${API_URL}/${name}`,
        method: 'put',
        data,
    })
}
