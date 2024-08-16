import { useEffect, useState } from 'react';
import EstadisticasTiposDeViolenciaTabla from '../TablasEstadisticas/EstadisticasTiposDeViolenciaTabla';
import TiposDeViolenciaTorta from '../Graficos/TiposDeViolenciaTorta';
const EstadisticasTiposDeViolencia = ({ denunciasAMostrar }: { denunciasAMostrar: any[] }) => {
    const [estadisticas, setEstadisticas] = useState<{ [tipo: string]: number }>({});

    const tipoViolenciaMapping: { [key: string]: string } = {
        Fisica: 'Física',
        Psicologica: 'Psicológica',
        Economica_y_patrimonial: 'Económica y Patrimonial',
        Sexual: 'Sexual',
        Simbolica: 'Simbólica',
        Politica: 'Política',
    };

    useEffect(() => {
        const calcularTiposDeViolencia = (denuncias: any[]) => {
            const estadisticas: { [tipo: string]: number } = { Total: 0 };

            denuncias.forEach((denuncia) => {
                const tipos = denuncia.tipo_de_violencia;
                const tiposActivos = [];

                for (const tipo in tipos) {
                    if (tipos[tipo]) {
                        tiposActivos.push(tipo);
                    }
                }

                if (tiposActivos.length === 1) {
                    const tipo = tiposActivos[0];
                    if (!estadisticas[tipo]) {
                        estadisticas[tipo] = 0;
                    }
                    estadisticas[tipo] += 1;
                    estadisticas.Total += 1;
                } else if (tiposActivos.length > 1) {
                    const combinacion = tiposActivos.sort().join(' + ');
                    if (!estadisticas[combinacion]) {
                        estadisticas[combinacion] = 0;
                    }
                    estadisticas[combinacion] += 1;
                    estadisticas.Total += 1;
                }

                // Increment the total count
            });

            return estadisticas;
        }

        setEstadisticas(calcularTiposDeViolencia(denunciasAMostrar));
    }, [denunciasAMostrar]);

    const formatTipoViolencia = (tipo: string) => {
        return tipo.split(' + ').map(t => tipoViolenciaMapping[t] || t).join(' + ');
    };

    return (
        <>
            <h1 className="text-2xl">Tipos de violencia registrados en la Provincia del Chaco {"(Total " + denunciasAMostrar?.length + ")"}</h1>
            <div className='flex flex-col md:flex-row justify-between'>
                <div className='flex flex-col w-9/10 md:w-4/10'>
                    <EstadisticasTiposDeViolenciaTabla tipos_de_violencia={estadisticas} format={formatTipoViolencia} />
                </div>
                <div className='flex flex-col w-9/10 md:w-4/10'>

                    <TiposDeViolenciaTorta tipos_de_violencia={estadisticas} />
                </div>

            </div>

        </>
    )
}

export default EstadisticasTiposDeViolencia;