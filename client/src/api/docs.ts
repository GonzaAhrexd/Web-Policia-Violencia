import axios from './axios'

export const generarWord = async (denuncia: any) => {
    try {
        const response = await axios.post('/crear-documento', denuncia, {
            responseType: 'blob',
        });
        return response.data;
    } catch (error) {
        console.error("Error generating document:", error);
        throw error;
    }
}