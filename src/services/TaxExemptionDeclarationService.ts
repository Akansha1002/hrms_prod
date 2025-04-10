import ApiService from './ApiService'

interface ApiResponse<T> {
    ok: boolean
    status: number
    data: T
    message?: string
}

// Get Employee Tax Exemption Declarations List
export async function apiGetEmployeeTaxDeclarations<T>(): Promise<
    ApiResponse<T>
> {
    return ApiService.fetchDataWithAxios<ApiResponse<T>>({
        url: `resource/Employee Tax Exemption Declaration?fields=["*"]`,
        method: 'get',
    })
}

// export async function apiGetEmployeeTaxExemptionSubCategories<T>() {
//     return ApiService.fetchDataWithAxios<T>({
//         url: '/resource/Employee Tax Exemption Sub Category',
//         method: 'get',
//         baseURL: 'http://139.59.72.197/api',
//         headers: {
//             Authorization: 'token 4d72ffee5959a1c:a93d40a489a949d',
//         },
//         params: {
//             fields: JSON.stringify(['*']),
//         },
//     })
// }

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
