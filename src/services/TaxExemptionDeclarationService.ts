import ApiService from './ApiService'

interface ApiResponse<T> {
    ok: boolean
    status: number
    data: T
    message?: string
}

export async function apiGetEmployeeTaxDeclarations<
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
            url: '/resource/Employee Tax Exemption Declaration?fields=["*"]',
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
            url: '/resource/Employee Tax Exemption Declaration',
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

export async function apiGetEmployeeTaxExemptionSubCategories<T>(): Promise<
    ApiResponse<T>
> {
    return ApiService.fetchDataWithAxios<ApiResponse<T>>({
        url: `resource/Employee Tax Exemption Sub Category?fields=["*"]`,
        method: 'get',
    })
}

export async function apiGetPayrollPeriod<T>(): Promise<ApiResponse<T>> {
    return ApiService.fetchDataWithAxios<ApiResponse<T>>({
        url: `resource/Payroll Period?fields=["*"]`,
        method: 'get',
    })
}

export async function apiGetCurrency<T>(): Promise<ApiResponse<T>> {
    return ApiService.fetchDataWithAxios<ApiResponse<T>>({
        url: `resource/Currency?fields=["*"]`,
        method: 'get',
    })
}

export async function apiGetCompany<T>(): Promise<ApiResponse<T>> {
    return ApiService.fetchDataWithAxios<ApiResponse<T>>({
        url: `resource/Company?fields=["*"]`,
        method: 'get',
    })
}

export async function apiCreateEmployeeTaxDeclarations<
    T,
    U extends Record<string, unknown>,
>(data: U) {
    return ApiService.fetchDataWithAxios<T>({
        url: 'resource/Employee Tax Exemption Declaration',
        method: 'post',
        data,
    })
}

export async function apiUpdatePassportDetails<
    T,
    U extends Record<string, unknown>,
>(name: string, data: U) {
    return ApiService.fetchDataWithAxios<T>({
        url: `resource/Employee Tax Exemption Declaration/${name}`,
        method: 'put',
        data,
    })
}
