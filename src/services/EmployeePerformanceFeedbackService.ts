import ApiService from './ApiService'

export async function apiGetPerformanceFeedbackList<T extends { data: any }, U extends Record<string, unknown>>(
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
            url: 'resource/Employee Performance Feedback?fields=["*"]',
            method: 'get',
            params: {
                limit_start: ((params.pageIndex as number) - 1) * (params.pageSize as number),
                limit_page_length: params.pageSize,
                filters: JSON.stringify(filters),
            },
        }),
        ApiService.fetchDataWithAxios<{ data: any[] }>({
            url: 'resource/Employee Performance Feedback',
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

export async function apiCreateEmployeeSkillMap<T, U extends Record<string, unknown>>(
    data: U,
) {
    return ApiService.fetchDataWithAxios<T>({
        url: 'resource/Employee Skill Map',
        method: 'post',
        data,
    })
}

//To get All Skill List
export async function apiGetSkillList<T, U extends Record<string, unknown>>({
    params: U,
}: U) {
    return ApiService.fetchDataWithAxios<T>({
        url: 'resource/Skill',
        method: 'get',

    })
}

// To get all Training Event List
export async function apiGetTrainingEventList<T, U extends Record<string, unknown>>({
    params: U,
}: U) {
    return ApiService.fetchDataWithAxios<T>({
        url: 'resource/Training Event?fields=["*"]',
        method: 'get',

    })
}