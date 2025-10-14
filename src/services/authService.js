import { get, post, } from './apiService';


export const register = (userData) => {
    return post('/auth/register', userdata)
}

export const login = (credentials) => {
    return post('/auth/login', credentials)
}

export const logout = () => {
    return post('/auth/logout')
}
export const getCurrentUser = () => {
    return get('/auth/me')
}