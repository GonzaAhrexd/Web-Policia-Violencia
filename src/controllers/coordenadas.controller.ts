import axios from 'axios';
const API_KEY = process.env.API_KEY_GEOCODING;

export const getCoords = async(req, res) => {
    try {
        const { direccion } = req.params
        const response = await axios.get(`https://geocode.maps.co/search?q=${direccion}, Chaco&api_key=${API_KEY}`)
        

        return res.json(response.data[0]) // Retorna las coordenadas de la dirección
    } catch (error) {
        console.log(error)
    }
}
