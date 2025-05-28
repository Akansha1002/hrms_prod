import ApiService from './ApiService'

export async function apiGetResignationList<
    T extends { data: any },
    U extends Record<string, unknown>,
>(params: U) {
    const filters = params.filters ? params.filters : []

    const [dataRes, countRes] = await Promise.all([
        ApiService.fetchDataWithAxios<T>({
            url: 'resource/Resignation',
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
            url: 'resource/Resignation',
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