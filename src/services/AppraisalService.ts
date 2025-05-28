import ApiService from './ApiService'

interface ApiResponse<T> {
    ok: boolean
    status: number
    data: T
    message?: string
}

const BASE_URL = 'resource/Appraisal'

export async function apiGetAppraisals<
    T extends { data: any[] },
    U extends Record<string, unknown>,
>(params: U): Promise<{ data: T['data']; total: number }> {
    const filters = []

    if (params.status) {
        filters.push(['status', '=', params.status])
    }

    if (params.query) {
        filters.push(['employee_name', 'like', `%${params.query}%`])
    }

    const [dataRes, countRes] = await Promise.all([
        ApiService.fetchDataWithAxios<T>({
            url: `${BASE_URL}?fields=["*"]`,

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
            url: BASE_URL,

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

export async function apiCreateAppraisal<T, U extends Record<string, unknown>>(
    data: U,
): Promise<ApiResponse<T>> {
    return ApiService.fetchDataWithAxios<ApiResponse<T>>({
        url: BASE_URL,
        method: 'post',

        data,
    })
}

export async function apiGetAppraisalCycleList<T>(): Promise<ApiResponse<T>> {
    return ApiService.fetchDataWithAxios<ApiResponse<T>>({
        url: 'resource/Appraisal Cycle?fields=["*"]',

        method: 'get',
    })
}

export async function apiGetAppraisalTemplateList<T>(): Promise<
    ApiResponse<T>
> {
    return ApiService.fetchDataWithAxios<ApiResponse<T>>({
        url: 'resource/Appraisal Template?fields=["*"]',

        method: 'get',
    })
}

export async function apiGetAppraisalTemplateByName<T>(
    name: string,
): Promise<ApiResponse<T>> {
    return ApiService.fetchDataWithAxios<ApiResponse<T>>({
        url: `resource/Appraisal Template/${name}`,
        method: 'get',
    })
}
