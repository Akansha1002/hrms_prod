import ApiService from '@/services/ApiService'

interface ApiResponse<T> {
    ok: boolean
    status: number
    data: T
    message?: string
}

export async function apiGetEmployeeSeparations<
    T extends { data: any },
    U extends Record<string, unknown>,
>(params: U) {
    const filters = []

    if (params.status) {
        filters.push(['boarding_status', '=', params.status])
    }

    if (params.query) {
        filters.push(['employee_name', 'like', `%${params.query}%`])
    }

    const [dataRes, countRes] = await Promise.all([
        ApiService.fetchDataWithAxios<T>({
            url: 'resource/Employee Separation?fields=["*"]',

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
            url: 'resource/Employee Separation',

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

export async function apiCreateEmployeeSeparation<
    T,
    U extends Record<string, unknown>,
>(data: U): Promise<ApiResponse<T>> {
    return ApiService.fetchDataWithAxios<ApiResponse<T>>({
        url: 'resource/Employee Separation',

        method: 'post',
        data,
    })
}

export async function apiGetEmployeeNameList<
    T,
    U extends Record<string, unknown>,
>({ params: U }: U) {
    return ApiService.fetchDataWithAxios<T>({
        url: 'resource/Employee?fields=["name","employee_name", "user_id"]',
        method: 'get',
    })
}
