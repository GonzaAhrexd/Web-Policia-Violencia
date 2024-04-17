import axios from './axios'

//@ts-ignore
export const registerRequest = user => axios.post(`/register`, user)
//@ts-ignore
export const loginRequest = user => axios.post(`/login`, user)
//@ts-ignore
export const verifyToken = (token) => axios.get(`/verify`)
