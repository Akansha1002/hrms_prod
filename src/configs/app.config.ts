export type AppConfig = {
    apiPrefix: string
    authenticatedEntryPath: string
    unAuthenticatedEntryPath: string
    locale: string
    accessTokenPersistStrategy: 'localStorage' | 'sessionStorage' | 'cookies'
    enableMock: boolean
    activeNavTranslation: boolean
}

const appConfig: AppConfig = {
    apiPrefix: '/api',
      // apiPrefix: 'http://159.65.147.182:8000/api/',
      // apiPrefix: 'http://139.59.72.197/api/',

    // authenticatedEntryPath: '/home',
    // authenticatedEntryPath: '/concepts/customers/customer-create',
    authenticatedEntryPath: '/concepts/dashboards',
    unAuthenticatedEntryPath: '/sign-in',
    locale: 'en',
    accessTokenPersistStrategy: 'cookies',
    enableMock: true,
    activeNavTranslation: false,
}

export default appConfig
