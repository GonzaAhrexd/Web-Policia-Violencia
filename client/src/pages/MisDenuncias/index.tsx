// Autenticación
import { useAuth } from '../../context/auth';
// Hooks
import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form'

// APIs del BackEnd
import { misDenuncias, getVictima, getVictimario, eliminarDenuncia } from '../../api/crud';
// Librerías react
import DataTable from 'react-data-table-component';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import Swal from 'sweetalert2';
// Iconos
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/solid'
import { ArrowDownCircleIcon, ArrowUpCircleIcon } from '@heroicons/react/24/outline'
// Componentes
import NavBar from '../../components/NavBar';
import SimpleTableCheckorX from '../../components/ShowData/SimpleTableCheckorX';
import InputCheckbox from '../../components/InputComponents/InputCheckbox';
import EditSection from '../../components/EditMode/EditSection';
import ShowTextArea from '../../components/ShowData/ShowTextArea';
import InputRegister from '../../components/InputComponents/InputRegister';
import InputDate from '../../components/InputComponents/InputDate';

function MisDenuncias() {
    //@ts-ignore
    const { signUp, user, isAuthenticated, isLoading } = useAuth();
    if (isLoading) return <h1>Cargando...</h1>
    if (!isLoading && !isAuthenticated && user.rol != "carga" || user.rol != "admin") return <Navigate to="/login" replace />

    const [denunciasAMostrar, setDenunciasAMostrar] = useState([]);
    const handleBusqueda = async (values: any) => {
        const fetchDenuncias = async () => {
            const result = await misDenuncias(values);
            setDenunciasAMostrar(result)
        }
        fetchDenuncias();
    }

    const {  register, handleSubmit, setValue, formState: {
        errors
    } } = useForm()

    // Iconos para expandir
    const expandableIcon = {
        collapsed: <ArrowDownCircleIcon className='h-6 w-6' />,
        expanded: <ArrowUpCircleIcon className='h-6 w-6' />
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


    const expandedComponents = ({ data }: any) => {

        // State para guardar los datos de la víctima
        const [victimaDatos, setVictimaDatos]: any = useState([])
        // State para guardar los datos del victimario
        const [victimarioDatos, setVictimarioDatos]: any = useState([])
        // Estado de editar global
        const [editGlobal, setEditGlobal] = useState(false)

        // Función para obtener los datos de la víctima
        const victimaObtener = async (id: string) => {
            try {
                // Llamada a la API
                const response: Response = await getVictima(id)
                // Establece en el hook los datos de la víctima
                setVictimaDatos(response)
            } catch (error) {
                console.log(error)
            }
        }
        const victimarioObtener = async (id: string) => {
            try {
                // Llamada a la API
                const response: Response = await getVictimario(id)
                // Establece en el hook los datos de la víctima
                setVictimarioDatos(response)
            } catch (error) {
                console.log(error)
            }
        }

        // Separar las coordenadas
        const latLng: Array<number> = data.GIS.split(" ");
        const lat: number = latLng[0]
        const lon: number = latLng[1]

        // useEffect para obtener los datos de la víctima y el victimario
        useEffect(() => {
            victimaObtener(data.victima_ID); // Asegúrate de tener un 'id' válido aquí
            victimarioObtener(data.victimario_ID)
        }, [data.victima_ID, data.victimario_ID]); // Se ejecuta cuando el componente se monta y cada vez que 'id' cambia

        // Función para abrir Google Maps con el mapa de y las coordenadas
        const handleClick = (GIS: string) => {
            // Separar las coordenadas
            const coordenadasSeparadas = GIS.split(' ')
            // URL de Google Maps
            const url = `https://www.google.com/maps/d/viewer?mid=1n-ERiPIZT9Q0WlRQoWI_NmvI9jJffohO&g_ep=CAESCjExLjEyNC4xMDIYACDdYio_LDk0MjE2NDEzLDk0MjEyNDk2LDk0MjA3NTA2LDk0MjE3NTIzLDk0MjE4NjUzLDQ3MDg3MTEyLDQ3MDg0MzkzQgJBUg%3D%3D&shorturl=1&ll=${coordenadasSeparadas[0]}%2C${coordenadasSeparadas[1]}&z=20`
            // Abrir en una nueva pestaña
            window.open(url, '_blank');
        }

        // Detalles del victimario
        const detallesVictimario = [
            { nombre: "Abuso de Alcohol", valor: victimarioDatos.abuso_de_alcohol },
            { nombre: "Antecedentes toxicológicos", valor: victimarioDatos.antecedentes_toxicologicos },
            { nombre: "Antecedentes Penales", valor: victimarioDatos.antecedentes_penales },
            { nombre: "Antecedentes Contravencionales", valor: victimarioDatos.antecedentes_contravencionales },
            { nombre: "Entrenamiento en combate", valor: victimarioDatos.entrenamiento_en_combate },
        ]
        // Medidas
        const medidas = [
            { nombre: "Prohibición de acercamiento", valor: data.medida.prohibicion_de_acercamiento },
            { nombre: "Restitución de menor", valor: data.medida.restitucion_de_menor },
            { nombre: "Exclusión de Hogar", valor: data.medida.exclusion_de_hogar },
            { nombre: "Alimento Provisorio", valor: data.medida.alimento_provisorio },
            { nombre: "Derecho de Comunicación", valor: data.medida.derecho_de_comunicacion },
            { nombre: "Botón antipánico", valor: data.medida.boton_antipanico }
        ]
        // Mostrar datos de la victima
        const victimaDatosMostrar = [
            { nombre: "Nombre", valor: victimaDatos.nombre },
            { nombre: "Apellido", valor: victimaDatos.apellido },
            { nombre: "Edad", valor: victimaDatos.edad },
            { nombre: "DNI", valor: victimaDatos.DNI },
            { nombre: "Estado Civil", valor: victimaDatos.estado_civil },
            { nombre: "Ocupación", valor: victimaDatos.ocupacion },
            { nombre: "Vínculo con agresor", valor: victimaDatos.vinculo_con_agresor },
            { nombre: "Condición de vulnerabilidad", valor: victimaDatos.condicion_de_vulnerabilidad },
            { nombre: "Denuncias previas", valor: victimaDatos.cantidad_de_denuncias_previas },
            { nombre: "Tiene hijos", valor: victimaDatos.hijos?.tiene_hijos ? "Sí" : "No" }
        ]
        // Mostrar datos de los hijos
        const hijosVictima = [
            { nombre: "Dependencia económica", valor: victimaDatos.hijos?.dependencia_economica },
            { nombre: "Mayores de edad", valor: victimaDatos.hijos?.mayores_de_edad },
            { nombre: "Menores de edad", valor: victimaDatos.hijos?.menores_de_edad },
            { nombre: "Menores discapacitados", valor: victimaDatos.hijos?.menores_discapacitados },
            { nombre: "Hijos con el agresor", valor: victimaDatos.hijos?.hijos_con_el_agresor }
        ]
        // Mostrar datos del victimario
        const victimarioDatosMostrar = [
            { nombre: "Nombre", valor: victimarioDatos.nombre },
            { nombre: "Apellido", valor: victimarioDatos.apellido },
            { nombre: "Edad", valor: victimarioDatos.edad },
            { nombre: "DNI", valor: victimarioDatos.DNI },
            { nombre: "Estado Civil", valor: victimarioDatos.estado_civil },
            { nombre: "Ocupación", valor: victimarioDatos.ocupacion },
            { nombre: "Notificación", valor: victimarioDatos.notificacion },
            { nombre: "Denuncias previas", valor: victimarioDatos.cantidad_de_denuncias_previas }
        ]

        // Datos del hecho
        const hechoDatosMostrar = [
            { nombre: "Número de expediente", valor: data.numero_de_expediente },
            { nombre: "Género", valor: data.genero },
            { nombre: "Fecha", valor: new Date(data.fecha).toLocaleDateString('es-AR') },
            { nombre: "Empleo de armas", valor: data.empleo_de_armas },
            { nombre: "Arma empleada", valor: data.arma_empleada },
            { nombre: "Juzgado Interviniente", valor: data.juzgado_interviniente },
            { nombre: "Dependencia derivada", valor: data.dependencia_derivada },
        ]

        // Tipos de violencia
        const tiposDeViolencia = [
            { nombre: "Violencia", valor: data.violencia },
            { nombre: "Modalidad", valor: data.modalidades },
            { nombre: "Física", valor: data.tipo_de_violencia.Fisica },
            { nombre: "Psicológica", valor: data.tipo_de_violencia.Psicologica },
            { nombre: "Sexual", valor: data.tipo_de_violencia.Sexual },
            { nombre: "Económica y Patrimonial", valor: data.tipo_de_violencia.Economica_y_patrimonial },
            { nombre: "Simbólica", valor: data.tipo_de_violencia.Simbolica },
            { nombre: "Política", valor: data.tipo_de_violencia.Politica }
        ]

        // Datos geográficos
        const hechoDatosGeográficos = [
            { nombre: "Unidad de Carga", valor: data.unidad_de_carga },
            { nombre: "Municipio", valor: data.municipio },
            { nombre: "Dirección", valor: data.direccion },
            { nombre: "Barrio", valor: data.barrio },
            { nombre: "GIS", valor: data.GIS },
            { nombre: "Jurisdicción Policial", valor: data.jurisdiccion_policial },
            { nombre: "Cuadrícula", valor: data.cuadricula },
            { nombre: "División Familiar y de Género", valor: data.isDivision },
        ]

        // Datos del tercero
        const terceroDatos = [
            { nombre: "Nombre", valor: data.nombre_tercero },
            { nombre: "Apellido", valor: data.apellido_tercero },
            { nombre: "DNI", valor: data.dni_tercero },
            { nombre: "Vinculo con la víctima", valor: data.vinculo_con_victima }
        ]

        // Medidas
        const medidaSolicitada = [
            { nombre: "Medida solicitada por la víctima", valor: data.medida_solicitada_por_la_victima },
            { nombre: "Medida dispuesta por autoridad judicial", valor: data.medida_dispuesta_por_autoridad_judicial },
        ]


        // Controlar cuando se da a eliminar
        const handleDelete = async (data: any) => {
            // Popup de confirmación
            Swal.fire({
                title: '¿Estás seguro?',
                text: "¡No podrás revertir esto!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sí, borrar',
                cancelButtonText: 'Cancelar'
            }).then(async (result) => {
                if (result.isConfirmed) {
                    try {
                        // Llamada a la API
                        eliminarDenuncia(data._id)
                        // Mensaje de éxito
                        Swal.fire(
                            'Borrado',
                            'La denuncia ha sido borrada',
                            'success'
                        ).then(() => {
                            window.location.reload()
                        })

                    } catch (error) {
                        // Si hay un error
                        Swal.fire(
                            'Error',
                            'Hubo un error al borrar la denuncia',
                            'error'
                        )
                    }
                }
            })
        }

        return <div className="flex flex-col p-2 sm:p-10 max-w-prose sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl 2xl:max-w-screen-2xl">
            {!editGlobal &&
                <>
                    <h1 className='text-3xl my-5 font-sans	'>Datos de la víctima</h1>
                    <div className='flex flex-col'>
                        <SimpleTableCheckorX campo="" datos={victimaDatosMostrar} />
                        {victimaDatos.hijos?.tiene_hijos && <SimpleTableCheckorX campo="Datos de sus hijos" datos={hijosVictima} />}
                    </div>

                    <h2 className='text-3xl my-5 font-sans	'>Datos del victimario</h2>

                    <SimpleTableCheckorX campo="" datos={victimarioDatosMostrar} />
                    <SimpleTableCheckorX campo="Detalles" datos={detallesVictimario} />
                    <h2 className='text-3xl my-5 font-sans	'>Hecho</h2>

                    <SimpleTableCheckorX campo="" datos={hechoDatosMostrar} />
                    <SimpleTableCheckorX campo="Datos geográficos" datos={hechoDatosGeográficos} />

                    <div className='flex flex-col w-8/10 lg:w-7/10 h-4/10 items-center justify-center mx-4 md:mx-auto my-5'>
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
                    <SimpleTableCheckorX campo="Tipo de Violencia" datos={tiposDeViolencia} />
                    <div className='flex flex-col'>
                        <SimpleTableCheckorX campo="Medida" datos={medidaSolicitada}></SimpleTableCheckorX>
                    </div>
                    {(data.medida_solicitada_por_la_victima || data.medida_dispuesta_por_autoridad_judicial) &&
                        <SimpleTableCheckorX campo="Medida dispuesta" datos={medidas} />
                    }
                    <div className='flex flex-col'>
                        {data.denunciado_por_tercero &&
                            <>
                                <SimpleTableCheckorX campo="Tercero" datos={terceroDatos} />
                            </>
                        }
                    </div >
                    <h2 className='text-3xl my-5 font-sans	'>Observaciones</h2>
                    <div className="flex flex-row">
                        <ShowTextArea campo="Observaciones" dato={data.observaciones} />
                    </div>
                    <div className='my-5 flex flex-col md:flex-row items-center justify-center w-full '>
                        <div className='bg-sky-950 hover:bg-sky-900 text-white cursor-pointer font-bold py-2 px-4 rounded w-6/10 md:w-2/10 flex items-center justify-center mx-2 mt-2 md:mt-0' onClick={() => setEditGlobal(!editGlobal)}>
                            <PencilSquareIcon className="w-7" />
                        </div>
                        <div className='bg-sky-950 hover:bg-sky-900 text-white cursor-pointer font-bold py-2 px-4 rounded w-6/10 md:w-2/10 flex items-center justify-center mx-2 mt-2 md:mt-0' onClick={() => handleDelete(data)}>
                            <TrashIcon className="w-7" />
                        </div>
                    </div>
                </>
            }
            {editGlobal &&
                <>
                    <EditSection datosGeograficos={hechoDatosGeográficos} datosHecho={data} datosVictima={victimaDatos} datosVictimario={victimarioDatos} setEditSection={setEditGlobal} editSection={editGlobal} />
                </>
            }
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
                    <InputCheckbox campo="Falta rellenar el expediente" nombre="is_expediente_completo" register={register} error={errors.is_expediente_completo} id="is_expediente_completo" type="checkbox" setValue={setValue}></InputCheckbox>
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