/*
_____________________________________________________________________________________________ 
Uso del componente:
    expandedComponents es una dependencia de la tabla mostrada en /MisDenuncias 
    Recibe los datos de la víctima, victimario y hecho para mostrarlos en una tabla
    y en un mapa. Además, se puede editar la denuncia y eliminarla.
_____________________________________________________________________________________________
*/
// Componentes
import SimpleTableCheckorX from '../../components/ShowData/SimpleTableCheckorX';
import ShowTextArea from '../../components/ShowData/ShowTextArea';
interface expandedComponentsProps {
    data: any
}
function expandedComponents({data}:expandedComponentsProps) {



    // Mostrar datos de los hijos
    const victimaDatosMostrar = [
        { nombre: "Nombre de la víctima", valor: data.nombre_victima },
        { nombre: "Apellido de la víctima", valor: data.apellido_victima },
        { nombre: "Edad víctima", valor: data.edad_victima },
        { nombre: "DNI víctima", valor: data.DNI_victima },
        { nombre: "Estado civil víctima", valor: data.estado_civil_victima },
        { nombre: "Ocupación víctima", valor: data.ocupacion_victima },
        { nombre: "Nacionalidad de la víctima", valor: data.nacionalidad_victima },
        { nombre: "Dirección víctima", valor: data.direccion_victima },
        { nombre: "Teléfono víctima", valor: data.telefono_victima },
        { nombre: "Con instrucción", valor: data.sabe_leer_y_escribir_victima },
    ]
    
    const preguntas = [
        { nombre: "¿Desea ser asistida por la línea 137?", valor: data.preguntas.desea_ser_asistida },
        { nombre: "¿Desea ser examinada por un médico?", valor: data.preguntas.desea_ser_examinada_por_medico },
        { nombre: "¿Desea accionar penalmente?", valor: data.preguntas.desea_accionar_penalmente },
        { nombre: "Desea agregar, quitar o enmendar algo?", valor: data.preguntas.desea_agregar_quitar_o_enmendar },
        { nombre: "¿Desea agregar, quitar o enmendar algo?", valor: data.preguntas.desea_agregar_quitar_o_enmendar },
    ]

    const secretarioDatosMostrar = [
        { nombre: "Nombre del secretario", valor: data.secretario.nombre_completo_secretario },
        { nombre: "Jerarquía secretario", valor: data.secretario.jerarquia_secretario },
        { nombre: "Plaza secretario", valor: data.secretario.plaza_secretario },
    ]

    const instructorDatosMostrar = [
        { nombre: "Nombre del instructor", valor: data.instructor.nombre_completo_instructor },
        { nombre: "Jerarquía instructor", valor: data.instructor.jerarquia_instructor },
    ]


    // Controlar cuando se da a eliminar
   

    return <div className="flex flex-col p-2 sm:p-10 max-w-prose sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl 2xl:max-w-screen-2xl">
            <>
                <h1 className='text-5xl my-5 font-sans'> Estado de la denuncia: {data.estado == "En verificación" && "En verificación ⏸️"} {data.estado == "Aprobada" && "Aprobado ✅"} {data.estado == "Rechazada" && "Rechazado ❌"}  </h1>
                <h1 className='text-3xl my-5 font-sans'>Datos de la víctima</h1>
                <div className='flex flex-col'>
                    <SimpleTableCheckorX campo="" datos={victimaDatosMostrar} />
                </div>
                <h1 className='text-3xl my-5 font-sans'>Preguntas</h1>
                <div className='flex flex-col'>
                    <SimpleTableCheckorX campo="" datos={preguntas} />
                </div>
                
                <h2 className='text-3xl my-5 font-sans	'>Observaciones</h2>
                <div className="flex flex-row">
                    <ShowTextArea campo="Observaciones" dato={data.observaciones} />
                </div>

                {data.preguntas.desea_agregar_quitar_o_enmendar &&
                    <>
                        <h2 className='text-3xl my-5 font-sans	'>Exposición</h2>
                        <div className="flex flex-row">
                            <ShowTextArea campo="Observaciones" dato={data.agrega} />
                        </div>
                    </>
                }
            </>
        
        <h2 className='text-3xl my-5 font-sans'>Secretario</h2>
        <div className='flex flex-row'>
            <SimpleTableCheckorX campo="" datos={secretarioDatosMostrar} />
        </div>

        <h2 className='text-3xl my-5 font-sans'>Instructor</h2>
        <div className='flex flex-row'>
            <SimpleTableCheckorX campo="" datos={instructorDatosMostrar} />
        </div>
      

    </div>

}

export default expandedComponents