// Contexto

import { useCampos } from '../../context/campos';

function TablaUnidades() {

  const { unidades } = useCampos();


  return (
            <>
            {unidades.length > 0 ? (
                
                <table className="table table-striped table-hover">
                    <thead>
                        
                        <tr>
                            <th>Nombre</th>
                            <th>Valor</th>
                            </tr>
                            </thead>
                            <tbody>
                              {unidades.map((unidad: any) => (
                                <tr key={unidad._id}>
                                    <td>{unidad.nombre}</td>
                                    <td>{unidad.valor}</td>
                                </tr>
                              ))}
                            </tbody>
                </table>
            ) : (

                <div className="alert alert-info">No hay unidades</div>
            )}
        
            
            </>
  )
}

export default TablaUnidades