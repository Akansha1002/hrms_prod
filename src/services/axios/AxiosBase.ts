import axios from 'axios'
import AxiosResponseIntrceptorErrorCallback from './AxiosResponseIntrceptorErrorCallback'
import AxiosRequestIntrceptorConfigCallback from './AxiosRequestIntrceptorConfigCallback'
import appConfig from '@/configs/app.config'
import type { AxiosError } from 'axios'

const AxiosBase = axios.create({
    timeout: 60000,
    // headers: {

    //     // "authorization": "token 22383aa5b27f69b:9278831c98f894e",
    //     "authorization": "token 4d72ffee5959a1c:a93d40a489a949d",

    // },
    baseURL: appConfig.apiPrefix,
})

AxiosBase.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('accessToken')
        if (token && config.headers) {
            config.headers['authorization'] = `token ${token}`
        }
        return AxiosRequestIntrceptorConfigCallback(config)
    },
    (error) => {
        return Promise.reject(error)
    },
)

AxiosBase.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
        AxiosResponseIntrceptorErrorCallback(error)
        return Promise.reject(error)
    },
)

export default AxiosBase
