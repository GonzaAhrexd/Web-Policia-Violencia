
type EstadisticasTiposDeViolenciaProps = {
  tipos_de_violencia: { [tipo: string]: number }
  format: (tipo: string) => string
}


function EstadisticasTiposDeViolencia({ tipos_de_violencia, format }: EstadisticasTiposDeViolenciaProps) {
  console.log(tipos_de_violencia)
  return (
    <div className="table w-full m-4 border-2 border-sky-800">
<div className='table-row'>
                <div className="flex items-center justify-between bg-sky-900 text-white font-medium h-10" >
                    <div className="w-8/10 ml-4">Tipos de violencia</div>
                    <div className="w-2/10">Hechos</div>
                </div>
            </div>
            {Object.entries(tipos_de_violencia).map(([tipo, cantidad]) => (
              tipo !== 'Total' && ( 
                
                <div className="flex flex-row items-between justify-between">
                <div className="flex pl-4 text-base font-medium md:text-xl w-full  md:w-8/10">{format(tipo)}</div>
                <div className="flex w-4/10 md:w-2/10 break-words break-all	">
                {cantidad}
                </div>
                </div> 
            )

            ))}

                   <div className="flex flex-row items-between justify-between">
                <div className="flex pl-4 text-base font-medium md:text-xl w-full  md:w-8/10">Total</div>
                <div className="flex w-4/10 md:w-2/10 break-words break-all	">
                {tipos_de_violencia.Total}
                </div>
                </div> 


    </div>
  )
}

export default EstadisticasTiposDeViolencia