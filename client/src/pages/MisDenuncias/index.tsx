import { useAuth } from '../../context/auth';
import { Navigate } from 'react-router-dom';
import NavBar from '../../components/NavBar';
import { misDenuncias, getVictima, getVictimario } from '../../api/crud';
import { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import SelectRegister from '../../components/SelectRegister';
import { generos } from '../../GlobalConst/generosCampos';
import { useForm } from 'react-hook-form'
import ShowData from '../../components/ShowData';
import ShowTextArea from '../../components/ShowTextArea';
import InputRegister from '../../components/InputRegister';
import InputDate from '../../components/InputDate';
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/solid'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { LatLng } from 'leaflet';
import SimpleTableCheckorX from '../../components/SimpleTableCheckorX';

function MisDenuncias() {
    //@ts-ignore
    const { signUp, user, isAuthenticated, isLoading } = useAuth();
    if (isLoading) return <h1>Cargando...</h1>
    if (!isLoading && !isAuthenticated) return <Navigate to="/login" replace />

    const [denunciasAMostrar, setDenunciasAMostrar] = useState([]);
    const handleBusqueda = async (values: any) => {

        const fetchDenuncias = async () => {
            const result = await misDenuncias(values);
            // @ts-ignore
            console.log(result)
            setDenunciasAMostrar(result)
        }

        fetchDenuncias();
    }

    const { control, register, handleSubmit, setValue, formState: {
        errors
    } } = useForm()


    const expandableIcon = {
        collapsed:
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="m9 12.75 3 3m0 0 3-3m-3 3v-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
        ,
        expanded:
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="m15 11.25-3-3m0 0-3 3m3-3v7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>



    }
    const columns = [
        {
            name: 'Número de Expediente',
            //@ts-ignore
            selector: row => row.numero_de_expediente,
            style: {
                fontSize: '14px',
                fontWeight: 500,
            },

        },
        {
            name: 'Fecha',
            //@ts-ignore
            selector: row => row.fecha,
            //Dame la fecha solamente en formato DD/MM/AAAA
            sortable: true,
            //@ts-ignore
            format: row => new Date(row.fecha).toLocaleDateString('es-AR'),
            style: {
                fontSize: '14px',
                fontWeight: 500,
            },
        },
        {
            name: 'Víctima',
            //@ts-ignore
            selector: row => row.victima_nombre,
            style: {
                fontSize: '14px',
                fontWeight: 500,
            },

        },
        {
            name: 'Victimario',
            //@ts-ignore
            selector: row => row.victimario_nombre,
            style: {
                fontSize: '14px',
                fontWeight: 500,
            },

        },
        {
            name: 'Municipio',
            //@ts-ignore
            selector: row => row.municipio,
            sortable: true,
            style: {
                fontSize: '14px',
                fontWeight: 500,
            },

        },
        {
            name: 'Dirección',
            //@ts-ignore
            selector: row => row.direccion,
            sortable: true,
            style: {
                fontSize: '14px',
                fontWeight: 500,
            },

        },
        {
            name: 'Jurisdicción policial',
            //@ts-ignore
            selector: row => row.jurisdiccion_policial,
            sortable: true,
            style: {
                fontSize: '14px',
                fontWeight: 500,
            },
            //@ts-ignore
        },
        {
            name: 'Violencia',
            //@ts-ignore
            selector: row => row.violencia,
            sortable: true,
            style: {
                fontSize: '14px',
                fontWeight: 500,
            },
        },
        {
            name: 'Modalidad',
            //@ts-ignore
            selector: row => row.modalidades,
            sortable: true,
            style: {
                fontSize: '14px',
                fontWeight: 500,
            },

        },

    ];

    const customStyles = {
        rows: {
            style: {
                minHeight: '72px', // override the row height
            },
        },
        headCells: {
            style: {
                paddingLeft: '8px', // override the cell padding for head cells
                paddingRight: '8px',
                fontSize: '14px',
                backgroundColor: '#0C4A6E',
                color: "#fff"

            },
        },
        cells: {
            style: {
                paddingLeft: '8px', // override the cell padding for data cells
                paddingRight: '8px',
            },
        },
    };

    //@ts-ignore
    const expandedComponents = ({ data }) => {

        const [victimaDatos, setVictimaDatos]: any = useState([])
        const [victimarioDatos, setVictimarioDatos]: any = useState([])

        const victimaObtener = async (id: string) => {
            try {
                const response = await getVictima(id)
                setVictimaDatos(response)
                console.log(response)
            } catch (error) {
                console.log(error)
            }
        }
        const victimarioObtener = async (id: string) => {
            try {
                const response = await getVictimario(id)
                setVictimarioDatos(response)
                console.log(response)
            } catch (error) {
                console.log(error)
            }

        }

        let latLng = data.GIS.split(" ");
        console.log(latLng)
        let lat = latLng[0]
        let lon = latLng[1]


        useEffect(() => {
            victimaObtener(data.victima_ID); // Asegúrate de tener un 'id' válido aquí
            victimarioObtener(data.victimario_ID)
        }, [data.victima_ID, data.victimario_ID]); // Se ejecuta cuando el componente se monta y cada vez que 'id' cambia

        const handleClick = (GIS: string) => {

            const coordenadasSeparadas = GIS.split(' ')
            const url = `https://www.google.com/maps/d/viewer?mid=1n-ERiPIZT9Q0WlRQoWI_NmvI9jJffohO&g_ep=CAESCjExLjEyNC4xMDIYACDdYio_LDk0MjE2NDEzLDk0MjEyNDk2LDk0MjA3NTA2LDk0MjE3NTIzLDk0MjE4NjUzLDQ3MDg3MTEyLDQ3MDg0MzkzQgJBUg%3D%3D&shorturl=1&ll=${coordenadasSeparadas[0]}%2C${coordenadasSeparadas[1]}&z=20`
            window.open(url, '_blank');

        }

        const tiposDeViolencia = [
            { nombre: "Física", valor: data.tipo_de_violencia.Fisica },
            { nombre: "Psicológica", valor: data.tipo_de_violencia.Psicologica },
            { nombre: "Sexual", valor: data.tipo_de_violencia.Sexual },
            { nombre: "Económica y Patrimonial", valor: data.tipo_de_violencia.Economica_y_patrimonial },
            { nombre: "Simbólica", valor: data.tipo_de_violencia.Simbolica },
            { nombre: "Política", valor: data.tipo_de_violencia.Politica }
        ]
        const detallesVictimario = [
            { nombre: "Abuso de Alcohol", valor: victimarioDatos.abuso_de_alcohol },
            { nombre: "Antecedentes toxicológicos", valor: victimarioDatos.antecedentes_toxicologicos },
            { nombre: "Antecedentes Penales", valor: victimarioDatos.antecedentes_penales },
            { nombre: "Antecedentes Contravencionales", valor: victimarioDatos.antecedentes_contravencionales },
            { nombre: "Entrenamiento en combate", valor: victimarioDatos.entrenamiento_en_combate },
        ]
        const medidas = [
            { nombre: "Prohibición de acercamiento", valor: data.medida.prohibicion_de_acercamiento },
            { nombre: "Restitución de menor", valor: data.medida.restitucion_de_menor },
            { nombre: "Exclusión de Hogar", valor: data.medida.exclusion_de_hogar },
            { nombre: "Alimento Provisorio", valor: data.medida.alimento_provisorio },
            { nombre: "Derecho de Comunicación", valor: data.medida.derecho_de_comunicacion },
            { nombre: "Botón antipánico", valor: data.medida.boton_antipanico }
        ]

        const victimaDatosMostrar = [
            {nombre: "Nombre", valor: victimaDatos.nombre},
            {nombre: "Apellido", valor: victimaDatos.apellido},
            {nombre: "Edad", valor: victimaDatos.edad},
            {nombre: "DNI", valor: victimaDatos.DNI},
            {nombre: "Estado Civil", valor: victimaDatos.estado_civil},
            {nombre: "Ocupación", valor: victimaDatos.ocupacion},
            {nombre: "Vínculo con agresor", valor: victimaDatos.vinculo_con_agresor},
            {nombre: "Condición de vulnerabilidad", valor: victimaDatos.condicion_de_vulnerabilidad},
            {nombre: "Denuncias previas", valor: victimaDatos.cantidad_de_denuncias_previas},
            {nombre: "Tiene hijos", valor: victimaDatos.hijos?.tiene_hijos ? "Sí" : "No"}
        ]

        const hijosVictima = [
            {nombre: "Dependencia económica", valor: victimaDatos.hijos?.dependencia_economica},
            {nombre: "Mayores de edad", valor: victimaDatos.hijos?.mayores_de_edad},
            {nombre: "Menores de edad", valor: victimaDatos.hijos?.menores_de_edad},
            {nombre: "Menores discapacitadas", valor: victimaDatos.hijos?.menores_discapacitados},
            {nombre: "Hijos con el agresor", valor: victimaDatos.hijos?.hijos_con_el_agresor}
        ]

        return <div className="flex flex-col p-2 sm:p-10 max-w-prose sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl 2xl:max-w-screen-2xl">
            <h1 className='text-3xl my-5 font-sans	'>Datos de la víctima</h1>
            <div className='flex flex-col'>
                <div className='flex flex-col lg:flex-row'>
                    <ShowData campo="Nombre" dato={victimaDatos.nombre} />
                    <ShowData campo="Apellido" dato={victimaDatos.apellido} />
                </div>
                <div className='flex flex-col lg:flex-row'>
                    <ShowData campo="Edad" dato={victimaDatos.edad} />
                    <ShowData campo="DNI" dato={victimaDatos.DNI} />
                </div>
                <div className='flex flex-col lg:flex-row'>
                    <ShowData campo="Estado Civil" dato={victimaDatos.estado_civil} />
                    <ShowData campo="Ocupación" dato={victimaDatos.ocupacion} />
                </div>
                <div className='flex flex-col lg:flex-row'>
                    <ShowData campo="Vínculo con agresor" dato={victimaDatos.vinculo_con_agresor} />
                    <ShowData campo="Condición de vulnerabilidad" dato={victimaDatos.condicion_de_vulnerabilidad} />
                </div>
                <div className='flex flex-col lg:flex-row'>
                    <ShowData campo="Denuncias previas" dato={victimaDatos.cantidad_de_denuncias_previas} />
                    <ShowData campo="Tiene hijos" dato={victimaDatos.hijos?.tiene_hijos ? "Sí" : "No"} />
                </div>
                <SimpleTableCheckorX campo="" datos={victimaDatosMostrar}/>

                 {!victimaDatos.hijos?.tiene_hijos &&  
                 <SimpleTableCheckorX campo="Datos de sus hijos" datos={hijosVictima}/>
                 }

                <h2 className='text-3xl my-5 font-sans	'>Datos del victimario</h2>

                <div className='flex flex-col lg:flex-row'>
                    <ShowData campo="Género" dato={victimarioDatos.nombre} />
                    <ShowData campo="Apellido" dato={victimarioDatos.apellido} />
                </div>
                <div className='flex flex-col lg:flex-row'>
                    <ShowData campo="Edad" dato={victimarioDatos.edad} />
                    <ShowData campo="DNI" dato={victimarioDatos.DNI} />
                </div>
                <div className='flex flex-col lg:flex-row'>
                    <ShowData campo="Estado civil" dato={victimarioDatos.estado_civil} />
                    <ShowData campo="Ocupación" dato={victimarioDatos.ocupacion} />
                </div>
                <SimpleTableCheckorX campo="Detalles" datos={detallesVictimario}/>
                <div className='flex flex-col lg:flex-row'>
                <ShowData campo="Notificación" dato={victimarioDatos.notificacion} />
                <ShowData campo="Denuncias totales" dato={victimarioDatos.cantidad_de_denuncias_previas} />
                </div>
                <h2 className='text-3xl my-5 font-sans	'>Hecho</h2>
                <div className="grid grid-cols-1 md:grid-cols-2">
                    <ShowData campo="Género" dato={data.genero} />
                    <ShowData campo="Fecha" dato={new Date(data.fecha).toLocaleDateString('es-AR')} />
                </div>
                <div className="grid grid-cols-1 ">
                    <ShowData campo="Unidad de Carga" dato={data.unidad_de_carga} />
                    <ShowData campo="Municipio" dato={data.municipio} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3">
                    <ShowData campo="Dirección" dato={data.direccion} />
                    <ShowData campo="Barrio" dato={data.barrio} />
                    <ShowData campo="GIS" dato={data.GIS} />
                </div>

                <div className='flex flex-col w-full lg:w-7/10 h-4/10 items-center justify-center mx-auto my-5'>
                    <MapContainer center={[lat, lon]} zoom={20} style={{ height: "60vh", width: "100%" }}>
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={[lat, lon]}>
                            <Popup>
                                {data.direccion + "," + data.barrio}
                            </Popup>
                        </Marker>
                    </MapContainer>

                    <div className='bg-sky-950 hover:bg-sky-900 text-white cursor-pointer font-bold py-2 px-4 rounded w-6/10 md:w-1/2 flex items-center justify-center mt-2 md:mt-0' onClick={() => handleClick(data.GIS)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7" >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                        </svg>
                    </div>
                </div>


                <div className="grid grid-cols-1 ">
                    <ShowData campo="Jurisdicción Policial" dato={data.jurisdiccion_policial} />
                    <ShowData campo="Cuadrícula" dato={data.cuadricula} />
                    <ShowData campo="División Familiar y de Género" dato={data.isDivision ? "Sí" : "No"} />
                    <ShowData campo="Número de Expediente" dato={data.numero_de_expediente} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 ">
                    <ShowData campo="Juzgado Interviniente" dato={data.juzgado_interviniente} />
                    <ShowData campo="Dependencia derivada" dato={data.dependencia_derivada} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 ">
                    <ShowData campo="Violencia" dato={data.violencia} />
                    <ShowData campo="Modalidad" dato={data.modalidades} />
                </div>

                <SimpleTableCheckorX campo="Tipo de Violencia" datos={tiposDeViolencia} />

                <div className="grid grid-cols-1 md:grid-cols-2 ">
                    <ShowData campo="Empleo de armas" dato={data.empleo_de_armas ? "Sí" : "No"} />
                    {data.empleo_de_armas &&
                        <ShowData campo="Arma empleada" dato={data.arma_empleada} />
                    }
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 ">
                    <ShowData campo="Medida solicitada por la víctima" dato={data.medida_solicitada_por_la_victima ? "Sí" : "No"} />
                    <ShowData campo="Medida dispuesta por autoridad judicial" dato={data.medida_dispuesta_por_autoridad_judicial ? "Sí" : "No"} />
                </div>
                {data.medida_dispuesta_por_autoridad_judicial &&
                    <SimpleTableCheckorX campo="Medida dispuestas" datos={medidas} />
                }
                <div className="grid grid-cols-1 md:grid-cols-3 ">
                    <ShowData campo="Denunciado por tercero" dato={data.denunciado_por_tecero ? "Sí" : "No"} />
                    {data.denunciado_por_tecero &&
                        <>
                            <ShowData campo="Nombre del tercero" dato={data.nombre_tercero} />
                            <ShowData campo="Apellido del tercero" dato={data.apellido_tercero} />
                            <ShowData campo="DNI del tercero" dato={data.dni_tercero} />
                            <ShowData campo="Relación con la víctima" dato={data.vinculo_con_victima} />
                        </>
                    }
                </div >
                <h2 className='text-3xl my-5 font-sans	'>Observaciones</h2>
                <div className="flex flex-row">
                    <ShowTextArea campo="Observaciones" dato={data.observaciones} />
                </div>
            </div>
        </div>

    }
    return (
        <div>
            <NavBar user={user} />
            <div className='h-screen sm:h-full p-2 sm:p-10'>
                <h1 className='text-3xl my-5'>Mis denuncias</h1>
                <h2 className='text-2xl my-5'>Buscar</h2>
                <form className="w-full flex flex-col items-center"
                    onSubmit={
                        handleSubmit(async (values) => {
                            handleBusqueda(values)
                        })}>
                    <InputDate campo="Desde" nombre="desde" register={register} type="date" error={errors} require={false}></InputDate>
                    <InputDate campo="Hasta" nombre="hasta" register={register} type="date" error={errors} require={false}></InputDate>
                    <InputRegister campo="Número de expediente" nombre="numero_de_expediente" register={register} type="text" error={errors.numero_de_expediente} require={false}></InputRegister>
                    <button className="bg-sky-950 hover:bg-sky-900 text-white font-bold py-2 px-4 rounded w-3/10"> Buscar</button>
                </form>
                <div className="flex flex-col w-full">
                    <h2 className='text-2xl my-5'>Denuncias</h2>
                    <DataTable
                        columns={columns}
                        data={denunciasAMostrar}
                        pagination
                        expandableRows
                        expandableRowsComponent={expandedComponents}
                        customStyles={customStyles}
                        responsive={true}
                        striped={true}
                        highlightOnHover={true}
                        noDataComponent="No hay denuncias para mostrar"
                        defaultSortFieldId={"Fecha"}
                        expandableIcon={expandableIcon}
                    />
                </div>
            </div>
        </div>
    )
}

export default MisDenuncias