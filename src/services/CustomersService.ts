import ApiService from './ApiService'

interface UploadResponse {
    message: {
        file_url: string;
        file_name: string;
        file_type: string;
        file_size: number;
        content_hash: string;
    };
}

// export async function apiGetCustomersList<T, U extends Record<string, unknown>>(
//     params: U,
// ) {
//     return ApiService.fetchDataWithAxios<T>({
//         url: 'http://159.65.147.182:8000/api/resource/Employee?fields=["*"]&with_count=true',
//         method: 'get',
//         params: {
//             limit_start: ((params.pageIndex as number) - 1) * (params.pageSize as number),
//             limit_page_length: params.pageSize,
//         },
//     })
// }

export async function apiGetCustomersList<T extends { data: any }, U extends Record<string, unknown>>(
    params: U,
) {
    const filters = []

    if (params.status) {
        filters.push(["employee_onboarding_status", "=", params.status])
    }

    if (params.query) {
        filters.push(["employee_name", "like", `%${params.query}%`])
    }

    const [dataRes, countRes] = await Promise.all([
        ApiService.fetchDataWithAxios<T>({
            url: 'resource/Employee?fields=["*"]',
            method: 'get',
            params: {
                limit_start: ((params.pageIndex as number) - 1) * (params.pageSize as number),
                limit_page_length: params.pageSize,
                filters: JSON.stringify(filters),
            },
        }),
        ApiService.fetchDataWithAxios<{ data: any[] }>({
            url: 'resource/Employee',
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


export async function apiGetCustomer<T, U extends Record<string, unknown>>({
    name,
    ...params
}: U) {
    return ApiService.fetchDataWithAxios<T>({
        url: `resource/Employee/${name}`,
        method: 'get',
        params,
    })
}

export async function apiUpdateEmployeeWorkflowState<T>(
    id: string,
    employeeOnboardingStatus: string
) {
    return ApiService.fetchDataWithAxios<T>({
        url: `resource/Employee/${id}`,
        method: 'put',
        data: {
            employee_onboarding_status: employeeOnboardingStatus
        },
    });
}

export async function apiCreateEmployee<T, U extends Record<string, unknown>>(
    data: U
) {
    return ApiService.fetchDataWithAxios<T>({
        url: 'resource/Employee',
        method: 'post',
        data,
    })
}

export async function apiUpdateEmployee<T, U extends Record<string, unknown>>(
    name: string,
    data: U
) {
    return ApiService.fetchDataWithAxios<T>({
        url: `resource/Employee/${name}`,
        method: 'put',
        data,
    })
}

// export async function apiUploadEmployeeImage<T>(data: FormData) {
//     return ApiService.fetchDataWithAxios<T>({
//         url: 'http://159.65.147.182:8000/api/resource/File',
//         method: 'post',
//         data,
//     })
// }
export async function apiUploadEmployeeImage(formData: FormData): Promise<string> {
    const response = await ApiService.fetchDataWithAxios<UploadResponse>({
        url: 'method/upload_file',
        method: 'post',
        data: formData as any,
        // headers: {
        //     'Content-Type': 'multipart/form-data',
        // },
    });

    return response.message.file_url; // Return file URL for next step
}

export async function apiAddEmployeeImage<T, U extends Record<string, unknown>>(
    name: string,
    data: U
) {
    return ApiService.fetchDataWithAxios<T>({
        url: `resource/Employee/${name}`,
        method: 'put',
        data,
    })
}