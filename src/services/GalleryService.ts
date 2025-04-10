import ApiService from './ApiService'

interface ApiResponse<T> {
    ok: boolean
    status: number
    data: T
    message?: string
}

// Create Gallery Entry
export async function createGallery<T, U extends Record<string, unknown>>(
    data: U,
): Promise<ApiResponse<T>> {
    return ApiService.fetchDataWithAxios<ApiResponse<T>>({
        url: 'resource/Gallery',
        method: 'post',
        data,
    })
}

// Read Gallery Entries
export async function getGallery<T>(): Promise<ApiResponse<T>> {
    return ApiService.fetchDataWithAxios<ApiResponse<T>>({
        url: `resource/Gallery?fields=["*"]`,
        method: 'get',
    })
}

// Update Gallery Entry
export async function updateGallery<T, U extends Record<string, unknown>>(
    id: string,
    data: U,
): Promise<ApiResponse<T>> {
    return ApiService.fetchDataWithAxios<ApiResponse<T>>({
        url: `resource/Gallery/${id}`,
        method: 'put',
        data,
    })
}
