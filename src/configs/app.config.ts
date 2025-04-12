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
    // apiPrefix: '/api',
      apiPrefix: 'https://uat-api.anavadya.io/api/',
      // apiPrefix: 'http://139.59.72.197/api',
    // authenticatedEntryPath: '/home',
    authenticatedEntryPath: '/concepts/customers/customer-create',
    unAuthenticatedEntryPath: '/sign-in',
    locale: 'en',
    accessTokenPersistStrategy: 'cookies',
    enableMock: true,
    activeNavTranslation: false,
}

export default appConfig
