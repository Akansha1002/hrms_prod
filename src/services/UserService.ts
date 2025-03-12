import ApiService from './ApiService'

const API_URL = 'http://159.65.147.182:8000/api/resource/User'

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
        url: API_URL,
        method: 'post',
        data,
    })
}