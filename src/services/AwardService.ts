import ApiService from './ApiService'

export async function getAwards<T>() {
    return ApiService.fetchDataWithAxios<T>({
        url: 'resource/Awards?fields=["*"]',
        method: 'get',

        params: {
            fields: JSON.stringify(['*']),
        },
    })
}
