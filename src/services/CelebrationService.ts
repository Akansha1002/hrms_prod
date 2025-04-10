import ApiService from './ApiService'

interface ApiResponse<T> {
    ok: boolean
    status: number
    data: T
    message?: string
}

// Create Celebration Entry
export async function createCelebration<T, U extends Record<string, unknown>>(
    data: U,
): Promise<ApiResponse<T>> {
    return ApiService.fetchDataWithAxios<ApiResponse<T>>({
        url: 'resource/Celebration',
        method: 'post',
        data,
    })
}

// Read Celebration Entries
export async function getCelebrations<T>(): Promise<ApiResponse<T>> {
    return ApiService.fetchDataWithAxios<ApiResponse<T>>({
        url: `resource/Celebration?fields=["*"]`,
        method: 'get',
    })
}

// Update Celebration Entry
export async function updateCelebration<T, U extends Record<string, unknown>>(
    id: string,
    data: U,
): Promise<ApiResponse<T>> {
    return ApiService.fetchDataWithAxios<ApiResponse<T>>({
        url: `resource/Celebration/${id}`,
        method: 'put',
        data,
    })
}
