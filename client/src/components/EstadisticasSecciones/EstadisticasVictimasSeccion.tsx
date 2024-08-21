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

    const [victimas, setVictimas] = useState(new Set())
    const [loading, setLoading] = useState(true)
    // Con un useEffect tiene que llenar todas las víctimas que se encuentren en las denuncias, pero sin repetir, en las denuncias sale como victima_ID, esta tiene que ser buscada y guardada en un array y seteado al estado victimas

    useEffect(() => {
        const fetchVictimas = async () => {
            const victimasSet = new Set()
    
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
    
        fetchVictimas()
        console.log(victimas)
    }, [])
    
    if (loading) {
        return <div>Cargando...</div>;
    }

    return (
    <>
        <SeccionOcupacion persona={victimas} tipo="víctima"/>
        <SeccionCondicion victimas={victimas} />
        <SeccionVinculoConAgresor denunciasAMostrar={denunciasAMostrar}/>
        <SeccionCompartenViviendaYDependenciaEconomica denunciasAMostrar={denunciasAMostrar}/>
    </>
)
}

export default EstadisticasVictimasSeccion