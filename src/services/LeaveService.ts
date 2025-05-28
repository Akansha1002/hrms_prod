import ApiService from './ApiService'

export async function apiGetLeaveTypeList<
    T,
    U extends Record<string, unknown>,
>({ params: U }: U) {
    return ApiService.fetchDataWithAxios<T>({
        url: `resource/Leave Type?fields=["*"]`,
        method: 'get',
    })
}

export async function apiGetLeaveApplicationList<
    T extends { data: any },
    U extends Record<string, unknown>,
>(params: U) {
    const filters = params.filters ? params.filters : []

    const [dataRes, countRes] = await Promise.all([
        ApiService.fetchDataWithAxios<T>({
            url: 'resource/Leave Application',
            method: 'get',
            params: {
                fields: JSON.stringify(['*']),
                limit_start:
                    ((params.pageIndex as number) - 1) *
                    (params.pageSize as number),
                limit_page_length: params.pageSize,
                filters: JSON.stringify(filters),
            },
        }),
        ApiService.fetchDataWithAxios<{ data: any[] }>({
            url: 'resource/Leave Application',
            method: 'get',
            params: {
                fields: JSON.stringify(['name']),
                filters: JSON.stringify(filters),
                limit_page_length: 0,
            },
        }),
    ])

    return {
        data: dataRes.data,
        total: countRes.data?.length || 0,
    }
}

// export async function apiGetLeaveApplication<
//     T,
//     U extends Record<string, unknown>,
// >({ id, ...params }: U) {
//     return ApiService.fetchDataWithAxios<T>({
//         url: `/Leave Application/${id}`,
//         method: 'get',
//         params,
//     })
// }

export async function apiAddLeaveApplication<
    T,
    U extends Record<string, unknown>,
>(data: U) {
    return ApiService.fetchDataWithAxios<T>({
        url: `resource/Leave Application`,
        method: 'post',
        data,
    })
}

export async function apiUpdateLeaveApplication<
    T,
    U extends Record<string, unknown>,
>(id: string, data: U) {
    return ApiService.fetchDataWithAxios<T>({
        url: `resource/Leave Application/${id}`,
        method: 'put',
        data,
    })
}

export async function apiGetLeaveAllocations<T, U extends { employee: string }>(
    params: U,
) {
    return ApiService.fetchDataWithAxios<T>({
        url: `resource/Leave Allocation`,
        method: 'get',
        params: {
            fields: JSON.stringify(['*']),
            filters: JSON.stringify([['employee', '=', params.employee]]),
        },
    })
}
