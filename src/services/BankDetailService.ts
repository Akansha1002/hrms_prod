import ApiService from '@/services/ApiService'

/**
 * Fetch Bank details by employee ID
 */
export async function apiGetBankDetails<T, U extends Record<string, unknown>>({
    name,
    ...params
}: U) {
    return ApiService.fetchDataWithAxios<T>({
        url: `resource/Bank Details/${name}`,
        method: 'get',
        params,
    })
}

/**
 * Create new Bank details
 */
export async function apiCreateBankDetails<T, U extends Record<string, unknown>>(
    data: U) {
    return ApiService.fetchDataWithAxios<T>({
        url: 'resource/Bank Details',
        method: 'post',
        data,
    })
}

/**
 * Update existing Bank details
 */
export async function apiUpdateBankDetails<T, U extends Record<string, unknown>>(
    name: string,
    data: U) {
    return ApiService.fetchDataWithAxios<T>({
        url: `resource/Bank Details/${name}`,
        method: 'put',
        data,
    })
}
