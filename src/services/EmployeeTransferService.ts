import ApiService from './ApiService'

interface ApiResponse<T> {
    ok: boolean
    status: number
    data: T
    message?: string
}

export async function apiGetEmployeeTransfers<
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
            url: '/resource/Employee Transfer?fields=["*"]',

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
            url: '/resource/Employee Transfer',

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

export async function apiCreateEmployeeTransfer<
    T,
    U extends Record<string, unknown>,
>(data: U): Promise<ApiResponse<T>> {
    return ApiService.fetchDataWithAxios<ApiResponse<T>>({
        url: 'resource/Employee Transfer',
        method: 'post',
        data,
    })
}
