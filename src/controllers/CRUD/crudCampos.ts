import campos from '../../models/campos';

export const createCampo = async (req, res) => {
    try{
        const {campo, value, tipo} = req.body;
        const newCampo = new campos({nombre: campo, value: value, tipo});
        await newCampo.save();
        res.status(201).json(newCampo);    
    }catch(error){
        console.log(error)
    }
}

export const obtenerCampo = async (req, res) => {
    try{
        const { tipo } = req.params
        const camposList = await campos.find({tipo})
        res.status(200).json(camposList)
    }catch(error){
        console.log(error)
    }   

}
