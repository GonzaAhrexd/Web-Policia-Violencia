import axios from './axios'

export const registerRequest = (user: any) => axios.post(`/register`, user)
export const loginRequest = (user: any) => axios.post(`/login`, user);
export const logoutRequest = () => axios.post(`/logout`)
// @ts-ignore
export const verifyToken = (token: string) => axios.get(`/verify`)
export const editUser = (user: any) => axios.put(`/editar-usuario/${user.id}`, user)
export const editUserImg = (userId: string, file: File) => {
  const formData = new FormData();
  formData.append('image', file); // Asume que el servidor espera un campo 'image' para el archivo

  // Opcional: Agrega otros campos si es necesario
  // formData.append('userId', userId);

  return axios.post(`/editar-imagen-usuario/${userId}`, formData);
};
export const getUserImage = (userId: string) => axios.get(`/users/${userId}/image`)