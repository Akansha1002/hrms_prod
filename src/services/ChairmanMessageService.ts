import ApiService from './ApiService'

interface ApiResponse<T> {
    ok: boolean
    status: number
    data: T
    message?: string
}

// Create Chairman Message Entry
export async function createChairmanMessage<
    T,
    U extends Record<string, unknown>,
>(data: U): Promise<ApiResponse<T>> {
    return ApiService.fetchDataWithAxios<ApiResponse<T>>({
        url: 'resource/Chairman Message',
        method: 'post',
        data,
    })
}

// Read Chairman Message Entries
export async function getChairmanMessages<T>(): Promise<ApiResponse<T>> {
    return ApiService.fetchDataWithAxios<ApiResponse<T>>({
        url: `resource/Chairman Message?fields=["*"]`,
        method: 'get',
    })
}


export async function getAllChairmanMessages<T>() {
    return ApiService.fetchDataWithAxios<T>({
        url: 'resource/Chairman Message?fields=["*"]',
        method: 'get',

    })
}

// Update Chairman Message Entry
export async function updateChairmanMessage<
    T,
    U extends Record<string, unknown>,
>(id: string, data: U): Promise<ApiResponse<T>> {
    return ApiService.fetchDataWithAxios<ApiResponse<T>>({
        url: `resource/Chairman Message/${id}`,
        method: 'put',
        data,
    })
}
