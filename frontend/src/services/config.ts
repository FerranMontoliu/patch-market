const config = {
  baseUrl: '/api/patches',
  headers: {
    Authorization: '',
  },
}

export const setToken = (newToken: string): void => {
  config.headers.Authorization = `Bearer ${newToken}`
}

export const getAuthConfig = () => config
