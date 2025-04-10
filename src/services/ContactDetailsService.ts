import ApiService from '@/services/ApiService'

/**
 * Fetch passport details by employee ID
 */
export async function apiGetContactDetails<T, U extends Record<string, unknown>>({
    name,
    ...params
}: U) {
    return ApiService.fetchDataWithAxios<T>({
        url: `/Contact Details/${name}`,
        method: 'get',
        params,
    })
}

/**
 * Create new passport details
 */
export async function apiCreateContactDetails<T, U extends Record<string, unknown>>(
    data: U) {
    return ApiService.fetchDataWithAxios<T>({
        url: '/Contact Details',
        method: 'post',
        data,
    })
}

/**
 * Update existing passport details
 */
export async function apiUpdateContactDetails<T, U extends Record<string, unknown>>(
    name: string,
    data: U) {
    return ApiService.fetchDataWithAxios<T>({
        url: `resource/Contact Details/${name}`,
        method: 'put',
        data,
    })
}
