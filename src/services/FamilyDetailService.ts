import ApiService from '@/services/ApiService'

export async function apiGetFamilyDetailsList<T, U extends Record<string, unknown>>({
    name,
    ...params
}: U) {
    return ApiService.fetchDataWithAxios<T>({
        url: `/Family Details?filters=${encodeURIComponent(JSON.stringify([["employee_number", "=", name]]))}&fields=["*"]`,
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
        url: `/Family Details/${name}`,
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
        url: 'resource/Family Details',
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
        url: `resource/Family Details/${name}`,
        method: 'put',
        data,
    })
}
