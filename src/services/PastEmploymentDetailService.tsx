import ApiService from '@/services/ApiService'


export async function apiGetPastEmploymentDetailsList<T, U extends Record<string, unknown>>({
    name,
    ...params
}: U) {
    return ApiService.fetchDataWithAxios<T>({
        // url: `${API_URL}?filters=[["employee_number", "=", ${name}]]`,
        url: `resource/Past Employee Details?filters=${encodeURIComponent(JSON.stringify([["employee_number", "=", name]]))}&fields=["*"]`,
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
        url: `resource/Past Employee Details/${name}`,
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
        url: 'resource/Past Employee Details',
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
        url: `resource/Past Employee Details/${name}`,
        method: 'put',
        data,
    })
}
