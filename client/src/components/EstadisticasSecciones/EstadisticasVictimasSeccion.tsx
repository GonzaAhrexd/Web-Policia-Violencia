import { useEffect, useState } from 'react'
// BackEnd
import { getVictima } from '../../api/crud'
// Componentes
import SeccionOcupacion from './EstadisticasVictima/SeccionOcupacion'
import SeccionCondicion from './EstadisticasVictima/SeccionCondicion'
import SeccionVinculoConAgresor from './EstadisticasVictima/SeccionVinculoConAgresor'
import SeccionCompartenViviendaYDependenciaEconomica from './EstadisticasVictima/SeccionCompartenViviendaYDependenciaEconomica'

type EstadisticasVictimasSeccionProps = {
    denunciasAMostrar: any
    }

function EstadisticasVictimasSeccion({denunciasAMostrar}: EstadisticasVictimasSeccionProps) {

    // Estado
    const [victimas, setVictimas] = useState(new Set())
    const [loading, setLoading] = useState(true)
    
    // UseEffect
    useEffect(() => {
        // Función para obtener las víctimas de las denuncias
        const fetchVictimas = async () => {
            // Set para guardar las víctimas
            const victimasSet = new Set()
            // Promesas para obtener las víctimas
            const victimaPromises = denunciasAMostrar.map(async (denuncia: any) => {
                const victima = await getVictima(denuncia.victima_ID)
                if (victima != null) {
                    victimasSet.add(JSON.stringify(victima))
                }
            })
    
            await Promise.all(victimaPromises)
    
            // Convertimos el Set a un arreglo de objetos
            const victimasArray:any = Array.from(victimasSet).map((victimaString:any) => JSON.parse(victimaString))
            setVictimas(victimasArray)
            setLoading(false)
        }
        // Llamamos a la función para obtener las víctimas
        fetchVictimas()
    }, [])
    
    // Si está cargando, mostrar "Cargando..."
    if (loading) {
        return <div>Cargando...</div>;
    }

    return (
    <>
        <SeccionOcupacion persona={victimas} tipo="Ocupación de víctimas"/>
        <SeccionCondicion victimas={victimas} />
        <SeccionVinculoConAgresor denunciasAMostrar={denunciasAMostrar}/>
        <SeccionCompartenViviendaYDependenciaEconomica denunciasAMostrar={denunciasAMostrar}/>
    </>
)
}

export default EstadisticasVictimasSeccion