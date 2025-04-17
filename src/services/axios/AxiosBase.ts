import axios from 'axios'
import AxiosResponseIntrceptorErrorCallback from './AxiosResponseIntrceptorErrorCallback'
import AxiosRequestIntrceptorConfigCallback from './AxiosRequestIntrceptorConfigCallback'
import appConfig from '@/configs/app.config'
import type { AxiosError } from 'axios'

const AxiosBase = axios.create({
    timeout: 60000,
    headers: {
        // 'Authorization': 'token 4d72ffee5959a1c:3acd9c854f137ef',
        'Authorization': 'token 4d72ffee5959a1c:147e5e4ffc04bfb',
    },

    baseURL: appConfig.apiPrefix,
})

AxiosBase.interceptors.request.use(
    (config) => {
        // const token = localStorage.getItem('accessToken') 
        // if (token && config.headers) {
        //     config.headers['Authorization'] = `token ${token}`
        // }
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
