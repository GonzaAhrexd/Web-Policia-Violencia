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
import { useState } from 'react';

import CargarAmpliacion from '../../components/Cargar/CargarAmpliacion/CargarAmpliacion';
import CargarPreventivo from '../../components/Cargar/CargarPreventivo/CargarPreventivo';

interface expandedComponentsProps {
    data: any
}
function expandedComponents({ data }: expandedComponentsProps) {

    const [ampliarDenuncia, setAmpliarDenuncia] = useState(false)
    const [crearPreventivo, setCrearPreventivo] = useState(false)

    const datosDenuncia = [
        {nombre: "Número de expediente", valor: data.numero_de_expediente},
        {nombre: "Fecha de denuncia", valor: data.fecha},

    ]

    // Mostrar datos de los hijos
    const victimaDatosMostrar = [
        { nombre: "Nombre de la víctima", valor: data.nombre_victima },
        { nombre: "Apellido de la víctima", valor: data.apellido_victima },
        { nombre: "Edad víctima", valor: data.edad_victima },
        { nombre: "DNI víctima", valor: data.DNI_victima },
        { nombre: "Estado civil víctima", valor: data.estado_civil_victima },
        { nombre: "Ocupación víctima", valor: data.ocupacion_victima },
        { nombre: "Nacionalidad de la víctima", valor: data.nacionalidad_victima },
        { nombre: "Domicilio de la víctima", valor: data.direccion_victima },
        { nombre: "Teléfono víctima", valor: data.telefono_victima },
        { nombre: "Con instrucción", valor: data.sabe_leer_y_escribir_victima },
    ]

    // Mostrar preguntas
    const preguntas = [
        { nombre: "¿Desea ser asistida por la línea 137?", valor: data.preguntas.desea_ser_asistida },
        { nombre: "¿Desea ser examinada por un médico?", valor: data.preguntas.desea_ser_examinada_por_medico },
        { nombre: "¿Desea accionar penalmente?", valor: data.preguntas.desea_accionar_penalmente },
        { nombre: "Desea agregar, quitar o enmendar algo?", valor: data.preguntas.desea_agregar_quitar_o_enmendar },
        { nombre: "¿Desea agregar, quitar o enmendar algo?", valor: data.preguntas.desea_agregar_quitar_o_enmendar },
    ]

    // Mostrar datos del secretario
    const secretarioDatosMostrar = [
        { nombre: "Nombre del secretario", valor: data.secretario.nombre_completo_secretario },
        { nombre: "Jerarquía secretario", valor: data.secretario.jerarquia_secretario },
        { nombre: "Plaza secretario", valor: data.secretario.plaza_secretario },
    ]

    // Mostrar datos del instructor
    const instructorDatosMostrar = [
        { nombre: "Nombre del instructor", valor: data.instructor.nombre_completo_instructor },
        { nombre: "Jerarquía instructor", valor: data.instructor.jerarquia_instructor },
    ]

  
    if(ampliarDenuncia) { 
        return <CargarAmpliacion data={data} setAmpliarDenuncia={setAmpliarDenuncia} />
    }

    if(crearPreventivo) { 
        return <CargarPreventivo data={data} setCrearPreventivo={setCrearPreventivo} />
    }
      if((!ampliarDenuncia) && (!crearPreventivo)) { 
    return <div className="flex flex-col p-1 sm:p-10 max-w-2xl sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl 2xl:max-w-full scale-up-ver-top">
        <> 
       
            <h1 className='text-5xl my-5 font-sans'> Estado de la denuncia: {data.estado == "En verificación" && "En verificación ⏸️"} {data.estado == "Aprobada" && "Aprobado ✅"} {data.estado == "Rechazada" && "Rechazado ❌"}  </h1>
            <h1 className='text-3xl my-5 font-sans'>Acciones</h1>
            <div className='flex flex-col md:flex-row gap-2 w-full items-center justify-center '>  
                <div
                className='flex flex-col items-center justify-center cursor-pointer bg-sky-950 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded w-full md:w-3/10'
                onClick={() => setAmpliarDenuncia(true)}>Ampliar denuncia</div>
                
                <div
                className='flex flex-col items-center justify-center cursor-pointer bg-sky-950 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded w-full md:w-3/10'
                onClick={() => setCrearPreventivo(true)}>Crear preventivo</div>
            </div>
            
            <h1 className='text-3xl my-5 font-sans'>Datos de la denuncia</h1>
            <div className='flex flex-col'>
                <SimpleTableCheckorX campo="" datos={datosDenuncia} />
            </div>
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
}

export default expandedComponents