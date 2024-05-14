import axios from 'axios'

export const getCoords = async (direccion: any) => { 
    //Hay que crear una carpeta .env.local en la raíz del proyecto y agregar la variable VITE_API_KEY_GEOCODING
    const APIKEY = import.meta.env.VITE_API_KEY_GEOCODING
    try{
        const response = await axios.get(`https://geocode.maps.co/search?q=${direccion}, Chaco&api_key=${APIKEY}`)
        const coordinates = response.data[0]
        
        return coordinates
    }catch(error){
        console.log(error)
    }
} 