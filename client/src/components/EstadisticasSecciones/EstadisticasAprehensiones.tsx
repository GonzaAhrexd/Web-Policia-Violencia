import { useEffect, useState } from 'react';
// Componentes
import EstadisticasAprehension from '../TablasEstadisticas/EstadisticasAprehension';
import EstadisticasAprehensionPorDivision from '../TablasEstadisticas/EstadisticasAprehensionPorDivision';
import AprehensionesGraficoTorta from '../Graficos/AprehensionesGraficoTorta';
import AprehensionesPorDivisionGrafico from '../Graficos/AprehensionesPorDivisionGrafico';
type EstadisticasDivisionProps = {
    denunciasAMostrar: any;
}

function EstadisticasAprehensiones({ denunciasAMostrar }: EstadisticasDivisionProps) {
    const [estadisticasAprehensiones, setestadisticasAprehensiones] = useState<any>({});
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        // console.log(denunciasAMostrar)
        const fetchDenuncias = async () => {
            if (denunciasAMostrar.length > 0) {
                const estadistica = await calcularEstadisticasAprehensiones(denunciasAMostrar)
                setestadisticasAprehensiones(estadistica)
            }
            console.log(estadisticasAprehensiones)
            setLoading(false);
        }
        fetchDenuncias()
    }, [denunciasAMostrar])


    const calcularEstadisticasAprehensiones = (denuncias: any[]) => {

            // Necesito que me calcule la cantidad de denuncias que tuvieron solicitud de aprehensión y cuales fueron aprehendidos efectivamente, en la bd viene las solicitudes como dato.medida_dispuesta.solicitud_de_aprehension y otra que sea solo dato.aprehension
            const estadisticas: { 
                medida_dispuesta_solicitud_de_aprehension: number; 
                aprehension: number;
                por_unidad: { [unidad: string]: { medida_dispuesta_solicitud_de_aprehension: number; aprehension: number } }
            } = { 
                medida_dispuesta_solicitud_de_aprehension: 0, 
                aprehension: 0,
                por_unidad: {}
            };
        
            denuncias.forEach((denuncia) => {
                const unidad = denuncia.unidad_de_carga;
                if (!estadisticas.por_unidad[unidad]) {
                    estadisticas.por_unidad[unidad] = { medida_dispuesta_solicitud_de_aprehension: 0, aprehension: 0 };
                }
        
                if (denuncia.medida_dispuesta.solicitud_de_aprehension) {
                    estadisticas.medida_dispuesta_solicitud_de_aprehension += 1;
                    estadisticas.por_unidad[unidad].medida_dispuesta_solicitud_de_aprehension += 1;
                }
                if (denuncia.aprehension) {
                    estadisticas.aprehension += 1;
                    estadisticas.por_unidad[unidad].aprehension += 1;
                }
            });
        
         

        return estadisticas;
    }
    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <h1 className="text-2xl">Hechos registrados en direcciones y divisiones del Chaco {"(Total de " + denunciasAMostrar?.length + " casos)"}</h1>
            <div className='flex flex-col md:flex-row justify-between'>
                <div className='flex flex-col w-9/10 md:w-4/10'>
                <div>
                    <EstadisticasAprehension estadisticasAprehensiones={estadisticasAprehensiones} />
                  </div>
                  <div className="text-2xl">
                    De un registro de { denunciasAMostrar?.length } hechos, se dispuso la aprehensión de {estadisticasAprehensiones.medida_dispuesta_solicitud_de_aprehension} victimarios de los cuales se efectivizaron {estadisticasAprehensiones.aprehension} aprehensiones.
                  </div>
                  <AprehensionesGraficoTorta solicitudes={estadisticasAprehensiones.medida_dispuesta_solicitud_de_aprehension - estadisticasAprehensiones.aprehension} aprehensiones={estadisticasAprehensiones.aprehension} />
                </div>
                <div className='w-full md:w-5/10'>
                    <EstadisticasAprehensionPorDivision estadisticasAprehensionPorDivision={estadisticasAprehensiones.por_unidad} total={estadisticasAprehensiones.medida_dispuesta_solicitud_de_aprehension} />
                    <AprehensionesPorDivisionGrafico datos={estadisticasAprehensiones.por_unidad} total={estadisticasAprehensiones.medida_dispuesta_solicitud_de_aprehension}/>
                </div>
            </div>
        </>
    )

}

export default EstadisticasAprehensiones