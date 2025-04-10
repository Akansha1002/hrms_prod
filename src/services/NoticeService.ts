import ApiService from './ApiService'
interface ApiResponse<T> {
    ok: boolean
    status: number
    data: T
    message?: string
}

// Create Notice Entry
export async function createNotice<T, U extends Record<string, unknown>>(
    data: U,
): Promise<ApiResponse<T>> {
    return ApiService.fetchDataWithAxios<ApiResponse<T>>({
        url: 'resource/Notice',
        method: 'post',
        data,
    })
}

// Read Notice Entries
export async function getNotices<T>(): Promise<ApiResponse<T>> {
    return ApiService.fetchDataWithAxios<ApiResponse<T>>({
        url: 'resource/Notice?fields=["*"]',
        method: 'get',
    })
}

// Update Notice Entry
export async function updateNotice<T, U extends Record<string, unknown>>(
    id: string,
    data: U,
): Promise<ApiResponse<T>> {
    return ApiService.fetchDataWithAxios<ApiResponse<T>>({
        url: `resource/Notice/${id}`,
        method: 'put',
        data,
    })
}
