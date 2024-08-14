import EstadisticasMunicipios from "../TablasEstadisticas/EstadisticasMunicipios"
import DenunciasMunicipios from "../Graficos/DenunciasMunicipios"

type EstadisticasMunicipiosSeccionProps = {
  denunciasAMostrar: any;
  estadisticaMunicipios: any;
}

function EstadisticasMunicipiosSeccion({ denunciasAMostrar, estadisticaMunicipios }: EstadisticasMunicipiosSeccionProps) {
  
  return (
    <div className='flex flex-col md:flex-row justify-between'>

      <div className='flex flex-col w-9/10 md:w-4/10'>
        {Object.entries(estadisticaMunicipios.estadisticas).map(([unidad, municipios]) => (
          <div key={unidad}>
            <h3 className='text-xl'>{unidad} </h3>
            <div>
              <ul>
                <EstadisticasMunicipios estadisticasTotal={estadisticaMunicipios.totales[unidad]} estadisticasUnidad={unidad} estadisticaMunicipios={municipios} />
              </ul>
            </div>
          </div>
        ))}
      </div>
      <div className='mt-10 w-full md:w-5/10'>
        <DenunciasMunicipios data={estadisticaMunicipios} />
      </div>
    </div>

  )
}

export default EstadisticasMunicipiosSeccion