import ApiService from '@/services/ApiService'

/**
 * Fetch driving license by employee ID
 */
export async function apiGetDrivingLicense<T, U extends Record<string, unknown>>({
    name,
    ...params
}: U) {
    return ApiService.fetchDataWithAxios<T>({
        url: `/Driving License/${name}`,
        method: 'get',
        params,
    })
}

/**
 * Create new driving license
 */
export async function apiCreateDrivingLicense<T, U extends Record<string, unknown>>(
    data: U) {
    return ApiService.fetchDataWithAxios<T>({
        url: '/Driving License',
        method: 'post',
        data,
    })
}

/**
 * Update existing driving license
 */
export async function apiUpdateDrivingLicense<T, U extends Record<string, unknown>>(
    name: string,
    data: U) {
    return ApiService.fetchDataWithAxios<T>({
        url: `resource/Driving License/${name}`,
        method: 'put',
        data,
    })
}
