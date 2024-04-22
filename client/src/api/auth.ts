import axios from './axios'

//@ts-ignore
export const registerRequest = user => axios.post(`/register`, user)
//@ts-ignore
export const loginRequest = user => axios.post(`/login`, user)

export const logoutRequest = () => axios.post(`/logout`)
//@ts-ignore
export const verifyToken = (token) => axios.get(`/verify`)

//@ts-ignore
export const editUser = user => ( 
 
    axios.put(`/editar-usuario/${user.id}`, user)
)