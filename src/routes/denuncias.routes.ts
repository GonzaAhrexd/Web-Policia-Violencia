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

// Denuncias del usuario logueado
router.get('/mis-denuncias/:desde/:hasta/:numero_de_expediente/:is_expediente_completo', authRequired, getMisDenuncias)
// Buscar entre todas las denuncias
router.get('/buscar-denuncias/:desde/:hasta/:id_denuncia/:numero_de_expediente/:is_expediente_completo/:division/:municipio/:comisaria/:relacion_victima_victimario/:aprehension/:manual', authRequired, getDenuncias)
// Generar Excel
router.get('/generar-excel-denuncias/:desde/:hasta/:id_denuncia/:numero_de_expediente/:is_expediente_completo/:division/:municipio/:comisaria/:relacion_victima_victimario/:aprehension/', authRequired, getDenunciasPlus)
// Editar denuncia por id
router.put('/editar-denuncias/:id', authRequired, updateDenuncia)
// Crear denuncia
router.post('/crear-denuncia/', authRequired, createDenuncia)
// Eliminar denuncia por id
router.delete('/eliminar-denuncias/:id', authRequired, deleteDenuncia)
// Buscar denuncia por id
router.get('/buscar-denuncias-id/:id', authRequired, getDenunciasId)
// Cantidad de denuncias
router.get('/cantidad-denuncias/:desde/:hasta', authRequired, getCantidadDenuncias)
// Imagenes de denuncias
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
// Editar imagen de denuncia
router.put('/editar-imagen-denuncia/', authRequired, editarImagenDenuncia)
router.get("/denuncias-estadistica-anual", authRequired, getDenunciasFullYear)

export default router
