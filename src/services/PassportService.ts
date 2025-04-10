import ApiService from '@/services/ApiService'

/**
 * Fetch passport details by employee ID
 */
export async function apiGetPassportDetails<T, U extends Record<string, unknown>>({
    name,
    ...params
}: U) {
    return ApiService.fetchDataWithAxios<T>({
        url: `resource/Passport Details/${name}`,
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
        url: 'resource/Passport Details',
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
        url: `resource/Passport Details/${name}`,
        method: 'put',
        data,
    })
}
