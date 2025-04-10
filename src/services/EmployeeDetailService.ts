import ApiService from '@/services/ApiService'

/**
 * Fetch employee details by employee ID
 */
export async function apiGetEmployeeDetails<T, U extends Record<string, unknown>>({
    name,
    ...params
}: U) {
    return ApiService.fetchDataWithAxios<T>({
        url: `resource/Employee Details/${name}`,
        method: 'get',
        params,
    })
}

/**
 * Create new employee details
 */
export async function apiCreateEmployeeDetails<T, U extends Record<string, unknown>>(
    data: U) {
    return ApiService.fetchDataWithAxios<T>({
        url: 'resource/Employee Details',
        method: 'post',
        data,
    })
}

/**
 * Update existing employee details
 */
export async function apiUpdateEmployeeDetails<T, U extends Record<string, unknown>>(
    name: string,
    data: U) {
    return ApiService.fetchDataWithAxios<T>({
        url: `resource/Employee Details/${name}`,
        method: 'put',
        data,
    })
}
