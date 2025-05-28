import ApiService from './ApiService'

interface ApiResponse<T> {
    ok: boolean
    status: number
    data: T
    message?: string
}

// Create News Entry
export async function createNews<T, U extends Record<string, unknown>>(
    data: U,
): Promise<ApiResponse<T>> {
    return ApiService.fetchDataWithAxios<ApiResponse<T>>({
        url: 'resource/News',
        method: 'post',
        data,
    })
}

// Read News Entries
export async function getNews<T>(): Promise<ApiResponse<T>> {
    return ApiService.fetchDataWithAxios<ApiResponse<T>>({
        url: `resource/News?fields=["*"]`,
        method: 'get',
    })
}

// Update News Entry
export async function updateNews<T, U extends Record<string, unknown>>(
    id: string,
    data: U,
): Promise<ApiResponse<T>> {
    return ApiService.fetchDataWithAxios<ApiResponse<T>>({
        url: `resource/News/${id}`,
        method: 'put',
        data,
    })
}
