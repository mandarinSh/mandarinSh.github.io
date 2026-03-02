import { api } from "../api"


export const login = (username: string, password: string) => {
    return api.post('/auth/login', { username, password, expiresInMins: 30 })
}

export const logout = () => {
    return api.post('/auth/logout')
}

export const authMe = () => {
    return api.get('/auth/me').then(res => res.data)
}
