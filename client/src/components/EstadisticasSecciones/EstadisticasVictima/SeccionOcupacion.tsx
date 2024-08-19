import { useState, useEffect } from 'react'
import EstadisticasTiposDeViolencia from '../../TablasEstadisticas/EstadisticasTiposDeViolenciaTabla'
import OcupacionGrafico from '../../Graficos/OcupacionGrafico'

type SeccionOcupacionProps = {
    victimas: any
}

function SeccionOcupacion({victimas}: SeccionOcupacionProps) {

    const [estadisticaOcupacion, setEstadisticaOcupacion] = useState<any>({})
    useEffect(() => {
        const fetchOcupaciones = async () => {
            const ocupaciones = await obtenerOcupaciones()
            setEstadisticaOcupacion(ocupaciones)
        }
        fetchOcupaciones()
    }, [victimas])

    const obtenerOcupaciones = () => {
        // Necesito que me vaya contando cada una de las ocupaciones que tienen las víctimas, es decir, algo como { "empleada": 5, "estudiante": 3, "desempleada": 2 }
        const ocupaciones: { [ocupacion: string]: number } = {}
        victimas.forEach((victima: any) => {
            if (!ocupaciones[victima.ocupacion]) {
                ocupaciones[victima.ocupacion] = 0
            }
            ocupaciones[victima.ocupacion] += 1
        })
        return ocupaciones
    }

    const format = (ocupacion: string) => {
        return ocupacion.charAt(0).toUpperCase() + ocupacion.slice(1)
    }

    return (

        <>
        <h1 className="text-2xl">Ocupaciones de víctimas registrados en la Provincia del Chaco en el periodo seleccionado {"(Total de " + victimas?.length + " víctimas)"}</h1>
        <div className='flex flex-col md:flex-row justify-between'>
            <div className='flex flex-col w-9/10 md:w-4/10'>
                <EstadisticasTiposDeViolencia texto="Ocupación" tipos_de_violencia={estadisticaOcupacion} format={format} />      
            </div>
            <div className='w-full md:w-5/10'>
              <OcupacionGrafico ocupaciones={estadisticaOcupacion} total={victimas.length}/>
            </div>
        </div>
    </>

)
}

export default SeccionOcupacion