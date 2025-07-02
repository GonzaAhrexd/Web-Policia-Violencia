/*  -----------------------------------------------------------------------------------------------------------------
    DENUNCIAS: 
    Son todas las denuncias cargadas por personal del área de estadística, ya sea de manera manual o verificando
    lo cargado por unidades externas. 
    -----------------------------------------------------------------------------------------------------------------
*/

import { Router } from 'express'
import { authRequired, authCarga } from '../middlewares/validateToken'
import { getMisDenuncias, getDenuncias, updateDenuncia, createDenuncia, deleteDenuncia, getDenunciasId, getCantidadDenuncias, editarImagenDenuncia, getDenunciasFullYear, getDenunciasPlus  } from '../controllers/CRUD/crudDenuncias'
import path from 'path';

const router: Router = Router()

// POST: Crear denuncia
router.post('/', authCarga, createDenuncia)
// GET: Buscar entre todas las denuncias
router.get('/buscar/:desde/:hasta/:id_denuncia/:numero_de_expediente/:is_expediente_completo/:division/:municipio/:comisaria/:relacion_victima_victimario/:aprehension/:manual', authRequired, getDenuncias)
// GET: Buscar denuncia por id
router.get('/buscar/:id', authCarga, getDenunciasId)
// GET: Generar Excel
router.get('/excel/:desde/:hasta/:id_denuncia/:numero_de_expediente/:is_expediente_completo/:division/:municipio/:comisaria/:relacion_victima_victimario/:aprehension/', authCarga, getDenunciasPlus)
// GET: Cantidad de denuncias
router.get('/cantidad/:desde/:hasta', authCarga, getCantidadDenuncias)
// GET: Denuncias del usuario logueado
router.get('/mis-denuncias/:desde/:hasta/:numero_de_expediente/:is_expediente_completo', authCarga, getMisDenuncias)
// GET: Estadística anual de denuncias
router.get("/estadistica-anual", authCarga, getDenunciasFullYear)
// GET: Imagenes de denuncias
router.get('/denuncias/:denunciaId/image', (req, res) => {
    const denunciaId = req.params.denunciaId;
    // Aquí iría tu lógica para encontrar la imagen basada en denunciaId
    // Por ejemplo, buscar en una base de datos el nombre de archivo de la imagen de la denuncia
    const imagePath = path.resolve(__dirname, `../imagesFromDB/denuncias/${denunciaId}.png`); // Asume que el nombre de la imagen es el ID de la denuncia
    res.sendFile(imagePath, (err) => {
        if (err) {
            res.status(404).send('Imagen no encontrada');
        }
    });
})
// PUT: Editar imagen de denuncia
router.put('/imagen/', authCarga, editarImagenDenuncia)
// PUT: Editar denuncia por id
router.put('/:id', authCarga, updateDenuncia)
// DELETE: Eliminar denuncia por id
router.delete('/:id', authCarga, deleteDenuncia)

export default router
