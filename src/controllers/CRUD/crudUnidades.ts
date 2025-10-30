import unidades from '../../models/unidadesCampos';

// POST: Función para crear una unidad
export const createUnidad = async (req, res) => {
    try {
        // Se crea la unidad
        const unidad = new unidades(req.body)
        // Se guarda la unidad en la base de datos
        await unidad.save()
        // Se retorna la unidad
        return res.status(201).json(unidad)
    } catch (error) {
        console.log(error)
    }
}

// GET: Función para obtener todas las unidades
export const getUnidades = async (req, res) => {
    try {
        const unidadesList = await unidades.find()
        res.json(unidadesList)
    } catch (error) {
        console.log(error)
    }
}


export const getUnidadesSued = async (req, res) => {
    try{
        const { token } = req.params
        if(token !== process.env.TOKEN_API_SUED){
            return res.status(401).json({ message: "Token inválido" })
        }
        const unidadesList = await unidades.find()

        res.json(unidadesList)
    } catch (error) {
        console.log(error)  
    }
}


// PUT: Función para actualizar una unidad
export const updateUnidad = async (req, res) => {
    try {
        const { id } = req.params
        const { nombre_unidad, valor_unidad} = req.body

        const unidad = await unidades.findByIdAndUpdate(id,{
            nombre: nombre_unidad,
            value: valor_unidad
        }
        )

        res.json(unidad)

    } catch (error) {
        console.log(error)
    }
}

// DELETE: Función para eliminar una unidad
export const deleteUnidad = async (req, res) => {
    try {
        const { id } = req.params
        await unidades.findByIdAndDelete(id)
        res.json({ message: "Unidad eliminada" })
    } catch (error) {
        console.log(error)
    }
}
// PUT: Municipio CRUD
// Agregar
export const addMunicipio = async (req, res) => {
    try {
        const { id } = req.params
        const { nombre_municipio, valor_municipio, prefijo_municipio, direccion_municipio, telefono_municipio } = req.body
        const unidad = await unidades.findById(id)
        unidad?.subdivisiones.push({
            nombre: nombre_municipio,
            value: valor_municipio,
            prefijo: prefijo_municipio,
            direccion: direccion_municipio,
            telefono: telefono_municipio,
        }
        )
        await unidad?.save()
        res.json(unidad)
    } catch (error) {
        console.log(error)
    }
}

// PUT: Editar
export const updateMunicipio = async (req, res) => {
    // Cómo podría buscar donde se encuentra el municipio entre todas las unidades y actualizarlo?
    try{
        const { nombre_original, nombre_municipio, valor_municipio, prefijo_municipio, direccion_municipio, telefono_municipio, supervision_municipio } = req.body

        // Busca el municipio en todas las unidades y actualiza en todas 
        await unidades.updateMany(
            { "subdivisiones.nombre": nombre_original },
            { $set: { "subdivisiones.$.nombre": nombre_municipio, "subdivisiones.$.value": valor_municipio, "subdivisiones.$.prefijo": prefijo_municipio, "subdivisiones.$.direccion": direccion_municipio, "subdivisiones.$.telefono": telefono_municipio, "subdivisiones.$.supervision": supervision_municipio } }
        )

        res.json({ message: "Municipio actualizado" })
        
        
    } catch (error) {
        console.log(error)
    }
}
// DELETE: Eliminar
export const deleteMunicipio = async (req, res) => {
    try{
        const { nombre } = req.params
        await unidades.updateMany(
            { "subdivisiones.nombre": nombre},
            { $pull: { subdivisiones: { nombre: nombre} } }
        )

        res.json({ message: "Municipio eliminado" })
    }catch(error){
        console.log(error)
    }
}
// PUT: COMISARÍAS
// Agregar comisaría
export const addComisaria = async (req, res) => {
    try{

        const { nombre_municipio, nombre_comisaria, valor_comisaria, supervision_comisaria, prefijo_comisaria, telefono_comisaria, direccion_comisaria } = req.body
       // Actualiza todos los municipios que tengan el nombre del municipio
        await unidades.updateMany(
            { "subdivisiones.nombre": nombre_municipio },
            { $push: { "subdivisiones.$.subdivisiones": { nombre: nombre_comisaria, value: valor_comisaria, prefijo: prefijo_comisaria, telefono: telefono_comisaria, direccion: direccion_comisaria, supervision: supervision_comisaria } } }
        )
        res.json({ message: "Comisaria agregada" })
        
    }catch(error){
        console.log(error)
    }
}

// PUT: Actualizar comisaría
export const updateComisaria = async (req, res) => {
    try {
        const { nombre_municipio, nombre_comisaria, nombre_original, valor_comisaria, prefijo_comisaria, telefono_comisaria, direccion_comisaria, supervision_comisaria } = req.body;

        // Encuentra el índice del municipio
        const municipio = await unidades.findOne({ "subdivisiones.nombre": nombre_municipio });
        if (!municipio) {
            return res.status(404).json({ message: "Municipio no encontrado" });
        }

        const municipioIndex = municipio.subdivisiones.findIndex(sub => sub.nombre === nombre_municipio);
        if (municipioIndex === -1) {
            return res.status(404).json({ message: "Municipio no encontrado" });
        }

        // Encuentra el índice de la comisaría dentro del municipio
        const comisariaIndex = municipio.subdivisiones[municipioIndex].subdivisiones.findIndex(sub => sub.nombre === nombre_original);
        if (comisariaIndex === -1) {
            return res.status(404).json({ message: "Comisaría no encontrada" });
        }

        // Construye la ruta de actualización
        const updatePathNombre = `subdivisiones.${municipioIndex}.subdivisiones.${comisariaIndex}.nombre`;
        const updatePathValue = `subdivisiones.${municipioIndex}.subdivisiones.${comisariaIndex}.value`;
        const updatePathPrefijo = `subdivisiones.${municipioIndex}.subdivisiones.${comisariaIndex}.prefijo`;
        const updatePathTelefono = `subdivisiones.${municipioIndex}.subdivisiones.${comisariaIndex}.telefono`;
        const updatePathDireccion = `subdivisiones.${municipioIndex}.subdivisiones.${comisariaIndex}.direccion`;
        const updatePathSupervision = `subdivisiones.${municipioIndex}.subdivisiones.${comisariaIndex}.supervision`;
        // Realiza la actualización
        await unidades.updateMany(
            { "subdivisiones.nombre": nombre_municipio, "subdivisiones.subdivisiones.nombre": nombre_original },
            { $set: { [updatePathNombre]: nombre_comisaria, [updatePathValue]: valor_comisaria, [updatePathPrefijo]: prefijo_comisaria, [updatePathTelefono]: telefono_comisaria, [updatePathDireccion]: direccion_comisaria, [updatePathSupervision]: supervision_comisaria } }
        );

        res.json({ message: "Comisaría actualizada" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error al actualizar la comisaría" });
    }
};
// DELETE: Eliminar comisarías
export const deleteComisaria = async (req, res) => {
    try {
        const { nombre, municipio } = req.params;

        // Eliminar la comisaría en donde coincida el municipio
        await unidades.updateMany(
            { "subdivisiones.nombre": municipio },
            { $pull: { "subdivisiones.$.subdivisiones": { nombre: nombre } } }
        );



        res.json({ message: "Comisaría eliminada" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error al eliminar la comisaría" });
    }
}

// PUT: Cuadrículas
export const addCuadriculaFromComisaria = async (req, res) => {
    try {
        const { nombre_municipio, nombre_comisaria, nombre_cuadricula, valor_cuadricula } = req.body;

        await unidades.updateMany(
            { "subdivisiones.nombre": nombre_municipio, "subdivisiones.subdivisiones.nombre": nombre_comisaria },
            { $push: { "subdivisiones.$.subdivisiones.$[comisaria].cuadriculas": { nombre: nombre_cuadricula, value: valor_cuadricula } } },
            { arrayFilters: [{ "comisaria.nombre": nombre_comisaria }] }
        );

        res.json({ message: "Cuadrícula agregada" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error al agregar la cuadrícula" });
    }
}
// PUT: Actualizar cuadrícula de una comisaría
export const updateCuadriculaFromComisaria = async (req, res) => {
    try {
        const { nombre_municipio, nombre_comisaria, nombre_cuadricula, nombre_original, valor_cuadricula } = req.body;

        const municipio = await unidades.findOne({ "subdivisiones.nombre": nombre_municipio });
        if (!municipio) {
            return res.status(404).json({ message: "Municipio no encontrado" });
        }

        const municipioIndex = municipio.subdivisiones.findIndex(sub => sub.nombre === nombre_municipio);
        if (municipioIndex === -1) {
            return res.status(404).json({ message: "Municipio no encontrado" });
        }

        // Encuentra el índice de la comisaría dentro del municipio
        const comisariaIndex = municipio.subdivisiones[municipioIndex].subdivisiones.findIndex(sub => sub.nombre === nombre_comisaria);
        if (comisariaIndex === -1) {
            return res.status(404).json({ message: "Comisaría no encontrada" });
        }

        const cuadriculaIndex = municipio.subdivisiones[municipioIndex].subdivisiones[comisariaIndex].cuadriculas.findIndex(sub => sub.nombre === nombre_original);
        if (cuadriculaIndex === -1) {
            return res.status(404).json({ message: "Cuadrícula no encontrada" });
        }

        const updatePathNombre = `subdivisiones.${municipioIndex}.subdivisiones.${comisariaIndex}.cuadriculas.${cuadriculaIndex}.nombre`;
        const updatePathValue = `subdivisiones.${municipioIndex}.subdivisiones.${comisariaIndex}.cuadriculas.${cuadriculaIndex}.value`;


        await unidades.updateMany(
            { "subdivisiones.nombre": nombre_municipio, "subdivisiones.subdivisiones.nombre": nombre_comisaria, "subdivisiones.subdivisiones.cuadriculas.nombre": nombre_original },
            { $set: { [updatePathNombre]: nombre_cuadricula, [updatePathValue]: valor_cuadricula } }
        );

        res.json({ message: "Cuadrícula actualizada" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error al actualizar la cuadrícula" });
    }
};


// PUT: Eliminar cuadrícula de una comisaría
export const deleteCuadriculaFromComisaria = async (req, res) => {
    try {
        const { cuadricula, comisaria, municipio } = req.params;

        await unidades.updateMany(
            { "subdivisiones.nombre": municipio, "subdivisiones.subdivisiones.nombre": comisaria },
            { $pull: { "subdivisiones.$.subdivisiones.$[comisaria].cuadriculas": { nombre: cuadricula } } },
            { arrayFilters: [{ "comisaria.nombre": comisaria }] }
        );

        res.json({ message: "Cuadrícula eliminada" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error al eliminar la cuadrícula" });
    }
}

// PUT: Cuadrículas
export const addCuadriculaFromMunicipio = async (req, res) => {
    try {
        const { nombre_municipio, nombre_cuadricula, valor_cuadricula } = req.body;

        await unidades.updateMany(
            { "subdivisiones.nombre": nombre_municipio },
            { $push: { "subdivisiones.$.cuadriculas": { nombre: nombre_cuadricula, value: valor_cuadricula } } }
        );

        res.json({ message: "Cuadrícula agregada" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error al agregar la cuadrícula" });
    }
}

// PUT: Actualizar cuadrícula de un municipio
export const updateCuadriculaFromMunicipio = async (req, res) => {
    try{
        const { nombre_municipio, nombre_cuadricula, nombre_original, valor_cuadricula } = req.body;

        const municipio = await unidades.findOne({ "subdivisiones.nombre": nombre_municipio });
        if (!municipio) {
            return res.status(404).json({ message: "Municipio no encontrado" });
        }

        const municipioIndex = municipio.subdivisiones.findIndex(sub => sub.nombre === nombre_municipio);
        if (municipioIndex === -1) {
            return res.status(404).json({ message: "Municipio no encontrado" });
        }

        const cuadriculaIndex = municipio.subdivisiones[municipioIndex].cuadriculas.findIndex(sub => sub.nombre === nombre_original);
        if (cuadriculaIndex === -1) {
            return res.status(404).json({ message: "Cuadrícula no encontrada" });
        }

        const updatePathNombre = `subdivisiones.${municipioIndex}.cuadriculas.${cuadriculaIndex}.nombre`;
        const updatePathValue = `subdivisiones.${municipioIndex}.cuadriculas.${cuadriculaIndex}.value`;

        await unidades.updateMany(
            { "subdivisiones.nombre": nombre_municipio, "subdivisiones.cuadriculas.nombre": nombre_original },
            { $set: { [updatePathNombre]: nombre_cuadricula, [updatePathValue]: valor_cuadricula } }
        );

        res.json({ message: "Cuadrícula actualizada" });
    }catch( error){
        console.log(error)
        res.status(500).json({ message: "Error al actualizar la cuadrícula" });
    }
}

// PUT: Eliminar cuadrícula de un municipio
export const deleteCuadriculaFromMunicipio = async (req, res) => {
    try {
        const { cuadricula, municipio } = req.params;
        await unidades.updateMany(
            { "subdivisiones.nombre": municipio },
            { $pull: { "subdivisiones.$.cuadriculas": { nombre: cuadricula } } }
        );

        res.json({ message: "Cuadrícula eliminada" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error al eliminar la cuadrícula" });
    }
}

