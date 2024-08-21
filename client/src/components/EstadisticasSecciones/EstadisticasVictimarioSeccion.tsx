// Componentes
import SeccionOcupacion from './EstadisticasVictima/SeccionOcupacion' 
import SeccionFuerzaDeSeguridad from './EstadisticasVictimario/SeccionFuerzasDeSeguridad'
import SeccionCondicionesVictimario from './EstadisticasVictimario/SeccionCondicionesVictimario'
// Hooks
import { useState, useEffect } from 'react'
// Backend
import { getVictimario } from '../../api/crud'

type EstadisticasVictimarioSeccionProps = {
    denunciasAMostrar: any
}


function EstadisticasVictimarioSeccion({denunciasAMostrar}: EstadisticasVictimarioSeccionProps) {
    const [victimarios, setVictimarios] = useState(new Set())
    const [loading, setLoading] = useState(true)
    
    useEffect(() => {
        const fetchVictimas = async () => {
            const victimarioSet = new Set()
    
            const victimaPromises = denunciasAMostrar.map(async (denuncia: any) => {
                const victima = await getVictimario(denuncia.victimario_ID)
                if (victima != null) {
                    victimarioSet.add(JSON.stringify(victima))
                }
            })
    
            await Promise.all(victimaPromises)
    
            // Convertimos el Set a un arreglo de objetos
            const victimarioArray:any = Array.from(victimarioSet).map((victimarioString:any) => JSON.parse(victimarioString))
            setVictimarios(victimarioArray)
            setLoading(false)
        }
    
        fetchVictimas()
        console.log(victimarios)
    }, [])
    
    if (loading) {
        return <div>Cargando...</div>;
    }

  return (
    <>
        <SeccionOcupacion persona={victimarios} tipo={"victimarios"} />
        <SeccionFuerzaDeSeguridad victimarios={victimarios} denuncias={denunciasAMostrar} />
        <SeccionCondicionesVictimario victimarios={victimarios} denunciasAMostrar={denunciasAMostrar} />
    </>
  )
}

export default EstadisticasVictimarioSeccion