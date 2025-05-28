// ExitInterviewService.ts
import ApiService from './ApiService'

interface ApiResponse<T> {
    ok: boolean
    status: number
    data: T
    message?: string
}

export async function createExitInterview<T, U extends Record<string, unknown>>(
    data: U,
): Promise<ApiResponse<T>> {
    return ApiService.fetchDataWithAxios<ApiResponse<T>>({
        url: 'resource/Exit Interview',

        method: 'post',
        data,
    })
}

export async function apiGetExitInterviews<
    T extends { data: any },
    U extends Record<string, unknown>,
>(params: U) {
    const filters = []

    if (params.status) {
        filters.push(['status', '=', params.status])
    }

    if (params.query) {
        filters.push(['employee_name', 'like', `%${params.query}%`])
    }

    const [dataRes, countRes] = await Promise.all([
        ApiService.fetchDataWithAxios<T>({
            url: 'resource/Exit Interview?fields=["*"]',

            method: 'get',
            params: {
                limit_start:
                    ((params.pageIndex as number) - 1) *
                    (params.pageSize as number),
                limit_page_length: params.pageSize,
                filters: JSON.stringify(filters),
            },
        }),
        ApiService.fetchDataWithAxios<{ data: any[] }>({
            url: 'resource/Exit Interview?fields=["*"]',

            method: 'get',
            params: {
                limit_page_length: 0,
                filters: JSON.stringify(filters),
                fields: '["name"]',
            },
        }),
    ])

    return {
        data: dataRes.data,
        total: countRes.data?.length || 0,
    }
}

export async function apiGetEmployeeName<T, U extends Record<string, unknown>>({
    params: U,
}: U) {
    return ApiService.fetchDataWithAxios<T>({
        url: 'resource/Employee?fields=["name","employee_name"]',
        method: 'get',
    })
}

export async function apiGetEmployeeById<T>(employeeId: string) {
    return ApiService.fetchDataWithAxios<T>({
        url: `resource/Employee/${employeeId}`,
        method: 'get',
    })
}
