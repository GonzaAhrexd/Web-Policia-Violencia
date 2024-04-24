import axios from './axios'

export const registerRequest = (user: any) => axios.post(`/register`, user)
export const loginRequest = (user: any) => axios.post(`/login`, user)
export const logoutRequest = () => axios.post(`/logout`)
export const verifyToken = (token: string) => axios.get(`/verify`)
export const editUser = (user: any) => axios.put(`/editar-usuario/${user.id}`, user)
