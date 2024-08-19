import { useEffect, useState } from "react"

import EstadisticasTiposDeViolencia from "../../TablasEstadisticas/EstadisticasTiposDeViolenciaTabla"

type SeccionVinculoConAgresorProps = {
    denunciasAMostrar: any
}

function SeccionVinculoConAgresor({denunciasAMostrar}: SeccionVinculoConAgresorProps) {

    const [vinculoConAgresor, setVinculoConAgresor] = useState({})
   
   
    useEffect(() => {
        const contador: { [key: string]: number } = {};
    
        denunciasAMostrar.forEach((denuncia: any) => {
          const relacion = denuncia.relacion_victima_victimario;
          if (contador[relacion]) {
            contador[relacion]++;
          } else {
            contador[relacion] = 1;
          }
        });
    
        setVinculoConAgresor(contador);
      }, [denunciasAMostrar]);
    
      
      const format = (value: string) => {
        return value;
      }


    return (
        <>
         <h1 className="text-2xl">Vínculo entre víctimas y victimarios registrados en la Provincia del Chaco {"(Total de " + denunciasAMostrar?.length + " casos)"}</h1>
            <EstadisticasTiposDeViolencia texto="Vínculo con el agresor" tipos_de_violencia={vinculoConAgresor} format={format}  />
        </>

    );

}

export default SeccionVinculoConAgresor