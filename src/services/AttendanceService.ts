import ApiService from '@/services/ApiService'

/**
 * Fetch Bank details by employee ID
 */
export async function apiGetSingleAttendance<T, U extends Record<string, unknown>>({
    id,
    ...params
}: U) {
    return ApiService.fetchDataWithAxios<T>({
        url: `resource/Attendance/${id}`,
        method: 'get',
        params,
    })
}
