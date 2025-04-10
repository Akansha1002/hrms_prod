import ApiService from './ApiService'

interface ApiResponse<T> {
    ok: boolean;
    status: number;
    data: T;
    message?: string;
}

/**
 * Register User
 */
export async function apiRegisterNewUser<T, U extends Record<string, unknown>>(
    data: U): Promise<ApiResponse<T>> {
    return ApiService.fetchDataWithAxios<ApiResponse<T>>({
        url: 'resource/User',
        method: 'post',
        data,
    })
}