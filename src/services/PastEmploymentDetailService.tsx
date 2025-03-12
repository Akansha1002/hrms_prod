import ApiService from '@/services/ApiService'

const API_URL = 'http://159.65.147.182:8000/api/resource/Past Employment Details'


export async function apiGetPastEmploymentDetailsList<T, U extends Record<string, unknown>>({
    name,
    ...params
}: U) {
    return ApiService.fetchDataWithAxios<T>({
        // url: `${API_URL}?filters=[["employee_number", "=", ${name}]]`,
        url: `${API_URL}?filters=${encodeURIComponent(JSON.stringify([["employee_number", "=", name]]))}&fields=["*"]`,
        method: 'get',
        params,
    })
}

/**
 * Fetch past employment details by employee ID
 */
export async function apiGetPastEmploymentDetail<T, U extends Record<string, unknown>>({
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
 * Create new past employment details
 */
export async function apiCreatePastEmploymentDetail<T, U extends Record<string, unknown>>(
    data: U) {
    return ApiService.fetchDataWithAxios<T>({
        url: API_URL,
        method: 'post',
        data,
    })
}

/**
 * Update existing past employment details
 */
export async function apiUpdatePastEmploymentDetail<T, U extends Record<string, unknown>>(
    name: string,
    data: U) {
    return ApiService.fetchDataWithAxios<T>({
        url: `${API_URL}/${name}`,
        method: 'put',
        data,
    })
}
