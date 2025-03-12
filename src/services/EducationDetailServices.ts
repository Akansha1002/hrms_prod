import ApiService from '@/services/ApiService'

const API_URL = 'http://159.65.147.182:8000/api/resource/Education Details'


export async function apiGetEducationDetailsList<T, U extends Record<string, unknown>>({
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
 * Fetch education details by employee ID
 */
export async function apiGetEducationDetail<T, U extends Record<string, unknown>>({
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
 * Create new education details
 */
export async function apiCreateEducationDetail<T, U extends Record<string, unknown>>(
    data: U) {
    return ApiService.fetchDataWithAxios<T>({
        url: API_URL,
        method: 'post',
        data,
    })
}

/**
 * Update existing education details
 */
export async function apiUpdateEducationDetail<T, U extends Record<string, unknown>>(
    name: string,
    data: U) {
    return ApiService.fetchDataWithAxios<T>({
        url: `${API_URL}/${name}`,
        method: 'put',
        data,
    })
}
