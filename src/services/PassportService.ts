import ApiService from '@/services/ApiService'

const API_URL = 'http://159.65.147.182:8000/api/resource/Passport Details'

/**
 * Fetch passport details by employee ID
 */
export async function apiGetPassportDetails<T, U extends Record<string, unknown>>({
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
export async function apiCreatePassportDetails<T, U extends Record<string, unknown>>(
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
export async function apiUpdatePassportDetails<T, U extends Record<string, unknown>>(
    name: string,
    data: U) {
    return ApiService.fetchDataWithAxios<T>({
        url: `${API_URL}/${name}`,
        method: 'put',
        data,
    })
}
