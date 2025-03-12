import ApiService from '@/services/ApiService'

const API_URL = 'http://159.65.147.182:8000/api/resource/Family Details'


export async function apiGetFamilyDetailsList<T, U extends Record<string, unknown>>({
    name,
    ...params
}: U) {
    return ApiService.fetchDataWithAxios<T>({
        url: `${API_URL}?filters=${encodeURIComponent(JSON.stringify([["employee_number", "=", name]]))}&fields=["*"]`,
        method: 'get',
        params,
    })
}

/**
 * Fetch family details by employee ID
 */
export async function apiGetFamilyDetail<T, U extends Record<string, unknown>>({
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
 * Create new family details
 */
export async function apiCreateFamilyDetail<T, U extends Record<string, unknown>>(
    data: U) {
    return ApiService.fetchDataWithAxios<T>({
        url: API_URL,
        method: 'post',
        data,
    })
}

/**
 * Update existing family details
 */
export async function apiUpdateFamilyDetail<T, U extends Record<string, unknown>>(
    name: string,
    data: U) {
    return ApiService.fetchDataWithAxios<T>({
        url: `${API_URL}/${name}`,
        method: 'put',
        data,
    })
}
