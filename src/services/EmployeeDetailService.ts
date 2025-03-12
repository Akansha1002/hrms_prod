import ApiService from '@/services/ApiService'

const API_URL = 'http://159.65.147.182:8000/api/resource/Employee Details'

/**
 * Fetch employee details by employee ID
 */
export async function apiGetEmployeeDetails<T, U extends Record<string, unknown>>({
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
 * Create new employee details
 */
export async function apiCreateEmployeeDetails<T, U extends Record<string, unknown>>(
    data: U) {
    return ApiService.fetchDataWithAxios<T>({
        url: API_URL,
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
        url: `${API_URL}/${name}`,
        method: 'put',
        data,
    })
}
