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

export const editarCampo = async (req, res) => {
    try{
        const { _id, campo, value } = req.body
        const updatedCampo = await campos.findByIdAndUpdate(_id, {nombre: campo, value}, {new: true})
        res.status(200).json(updatedCampo)
    }catch(error){
        console.log(error)
    }
}
export const eliminarCampo = async (req, res) => {
    try{
        const { id } = req.params
        await campos.findByIdAndDelete(id)
        res.status(200).json('Campo eliminado')
    }catch(error){
        console.log(error)
    }
}
