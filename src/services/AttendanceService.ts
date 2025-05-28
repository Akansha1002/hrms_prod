import ApiService from '@/services/ApiService'

interface ApiResponse<T> {
    ok: boolean
    status: number
    data: T
    message?: string
}

/**
 * Fetch Bank details by employee ID
 */
export async function apiGetSingleAttendance<
    T,
    U extends Record<string, unknown>,
>({ id, ...params }: U) {
    return ApiService.fetchDataWithAxios<T>({
        url: `resource/Attendance/${id}`,
        method: 'get',
        params,
    })
}

export async function apiGetAttendanceByEmployee<
    T,
    U extends { employeeId: string },
>(params: U) {
    const { employeeId } = params

    return ApiService.fetchDataWithAxios<T>({
        url: `resource/Attendance`,
        method: 'get',
        params: {
            fields: JSON.stringify(['*']),
            filters: JSON.stringify([['employee', '=', employeeId]]),
        },
    })
}

export async function apiGetAttendanceDetails<
    T,
    U extends Record<string, unknown>,
>({ employee, ...params }: U & { employee: string }) {
    return ApiService.fetchDataWithAxios<T>({
        url: 'resource/Attendance',
        method: 'get',
        params: {
            ...params,
            fields: ['*'],
            filters: [['employee', '=', employee]],
        },
    })
}

// Create Attendance Entry
export async function createAttendanceEntry<
    T,
    U extends Record<string, unknown>,
>(data: U): Promise<ApiResponse<T>> {
    return ApiService.fetchDataWithAxios<ApiResponse<T>>({
        url: 'resource/Attendance',
        method: 'post',
        data,
    })
}

// Read All Attendance Entries
export async function getAllAttendances<T>(): Promise<ApiResponse<T>> {
    return ApiService.fetchDataWithAxios<ApiResponse<T>>({
        url: 'resource/Attendance?fields=["*"]',
        method: 'get',
    })
}

// Read Attendance Entries with Filters + Pagination
export async function apiGetAttendanceEntries<
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
            url: 'resource/Attendance?fields=["*"]',
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
            url: 'resource/Attendance',
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

// Update Attendance Entry
export async function updateAttendanceEntry<
    T,
    U extends Record<string, unknown>,
>(id: string, data: U): Promise<ApiResponse<T>> {
    return ApiService.fetchDataWithAxios<ApiResponse<T>>({
        url: `resource/Attendance/${id}`,
        method: 'put',
        data,
    })
}
