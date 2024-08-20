import { useEffect, useState } from 'react'

import EstadisticasMedidasCautelaresTabla from './../TablasEstadisticas/EstadisticasTiposDeViolenciaTabla'
import DenunciasMedidasCautelaresGrafico from '../Graficos/DenunciasMedidasCautelaresGrafico';
type EstadisticasMedidasCautelaresProps = {
  denunciasAMostrar: any
}

function EstadisticasMedidasCautelares({ denunciasAMostrar }: EstadisticasMedidasCautelaresProps) {

  const [estadisticas, setEstadisticas] = useState<{ [tipo: string]: number }>({});
  const [estadisticasMedidasDispuestas, setEstadisticasMedidasDispuestas] = useState<{ [tipo: string]: number }>({});
  const tipoViolenciaMapping: { [key: string]: string } = {
    prohibicion_de_acercamiento: 'Prohibición de Acercamiento',
    exclusion_de_hogar: 'Exclusión de Hogar',
    alimento_provisorio: 'Alimento Provisorio',
    boton_antipanico: 'Botón Antipánico',
    derecho_de_comunicacion: 'Derecho de Comunicación',
    restitucion_de_menor: 'Restitución de Menor',
    notificacion: 'Notificación',
    solicitud_de_aprehension: 'Solicitud de Aprehensión',
    expedientes_con_cautelar: 'Expedientes con Cautelar',
    ninguna: 'Ninguna',
  };
  useEffect(() => {
    const calcularTiposDeViolencia = (denuncias: any[]) => {
        const estadisticas: { [tipo: string]: number } = { Total: 0 };
        const estadisticasMedidasDispuestas: { [tipo: string]: number } = { Total: 0 };

        denuncias.forEach((denuncia) => {
            const medidas = denuncia.medida;
            const medidasDispuestas = denuncia.medida_dispuesta;
            const medidasActivas = [];
            const medidasDispuestasActivas = [];

            // Contar medidas cautelares activas
            for (const medida in medidas) {
                if (medidas[medida]) {
                    medidasActivas.push(medida);
                }
            }

            // Contar medidas cautelares dispuestas
            for (const medida in medidasDispuestas) {
                if (medidasDispuestas[medida]) {
                    medidasDispuestasActivas.push(medida);
                }
            }

            medidasActivas.forEach((medida) => {
                if (!estadisticas[medida]) {
                    estadisticas[medida] = 0;
                }
                estadisticas[medida] += 1;
            });

            medidasDispuestasActivas.forEach((medida) => {
                if (!estadisticasMedidasDispuestas[medida]) {
                    estadisticasMedidasDispuestas[medida] = 0;
                }
                estadisticasMedidasDispuestas[medida] += 1;
            });

            estadisticas.Total += 1;
            estadisticasMedidasDispuestas.Total += 1;
        });

        return { estadisticas, estadisticasMedidasDispuestas };
    };

    const { estadisticas, estadisticasMedidasDispuestas } = calcularTiposDeViolencia(denunciasAMostrar);
    setEstadisticas(estadisticas);
    setEstadisticasMedidasDispuestas(estadisticasMedidasDispuestas);
    console.log(estadisticas, estadisticasMedidasDispuestas);
}, [denunciasAMostrar]);

  const formatTipoViolencia = (tipo: string) => {
    return tipo.split(' + ').map(t => tipoViolenciaMapping[t] || t).join(' + ');
  }

  return (
    <div className='flex flex-col'>
      <h1 className="text-2xl">Medidas solicitadas en la Provincia del Chaco  {"(Total de " + denunciasAMostrar?.length + " casos)"}</h1>
      <div className='flex flex-col md:flex-row justify-between'>
        <div className='flex flex-col w-9/10 md:w-4/10'>
          <EstadisticasMedidasCautelaresTabla texto="Medidas solicitadas" tipos_de_violencia={estadisticas} format={formatTipoViolencia} />
        </div>
        <div className='flex flex-col w-9/10 md:w-4/10'>
          <DenunciasMedidasCautelaresGrafico  estadistica={estadisticas}/>
        </div>
      </div>
      <h1 className="text-2xl">Medidas dispuestas por autoridad judicial en la Provincia del Chaco  {"(Total de " + denunciasAMostrar?.length + " casos)"}</h1>
      <div className='flex flex-col md:flex-row justify-between'>
        <div className='flex flex-col w-9/10 md:w-4/10'>
          <EstadisticasMedidasCautelaresTabla texto="Medidas dispuestas" tipos_de_violencia={estadisticasMedidasDispuestas} format={formatTipoViolencia} />
        </div>
        <div className='flex flex-col w-9/10 md:w-4/10'>
          <DenunciasMedidasCautelaresGrafico  estadistica={estadisticasMedidasDispuestas}/>
        </div>
      </div>
    </div>
  )
}

export default EstadisticasMedidasCautelares