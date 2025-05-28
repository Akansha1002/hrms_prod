import ApiService from './ApiService'

export async function getNotifications<T>() {
    return ApiService.fetchDataWithAxios<T>({
        url: 'resource/Notifications?fields=["*"]',
        method: 'get',

        params: {
            fields: JSON.stringify(['*']),
        },
    })
}
