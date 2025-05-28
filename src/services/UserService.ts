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

// get workflow states
export async function apiGetWorkflowStates<T, U extends Record<string, unknown>>({
    workflow_name,
    ...params
}: U) {
    return ApiService.fetchDataWithAxios<T>({
        url: 'method/hrms_centillion.api.api.get_editable_states_for_user',
        method: 'get',
        params: {
            workflow_name: "Onboarding Workflow",
            ...params,
        },
        withCredentials: true,
    });
}
