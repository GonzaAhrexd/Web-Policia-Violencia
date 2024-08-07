import axios from 'axios'
const baseUrl = import.meta.env.VITE_BASE_URL
axios.defaults.withCredentials = true;

const instance = axios.create({
    
    baseURL: baseUrl,
    withCredentials: true
})


export default instance