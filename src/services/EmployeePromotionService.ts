import ApiService from './ApiService'

export async function apiGetEmployeePromotion<T extends { data: any }, U extends Record<string, unknown>>(
    params: U,
) {
    const filters = []

    if (params.status) {
        filters.push(["status", "=", params.status])
    }

    if (params.query) {
        filters.push(["employee_name", "like", `%${params.query}%`])
    }

    const [dataRes, countRes] = await Promise.all([
        ApiService.fetchDataWithAxios<T>({
            url: 'resource/Employee Promotion?fields=["*"]',
            method: 'get',
            params: {
                limit_start: ((params.pageIndex as number) - 1) * (params.pageSize as number),
                limit_page_length: params.pageSize,
                filters: JSON.stringify(filters),
            },
        }),
        ApiService.fetchDataWithAxios<{ data: any[] }>({
            url: 'resource/Employee Promotion',
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

// Fetch Properties of employee by employee ID

export async function apiGetPropertyListByEmployeeId<T, U extends Record<string, unknown>>({
    name,
    ...params
}: U) {
    return ApiService.fetchDataWithAxios<T>({
        url: `method/hrms_centillion.api.api.get_all_employee_properties`,
        method: 'get',
        params: {
            employee_id: name,
            ...params,
        },
    })
}