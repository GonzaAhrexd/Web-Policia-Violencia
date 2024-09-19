
//  Componentes
import { useForm } from 'react-hook-form';
import InputRegister from '../../InputComponents/InputRegister';

// Backend
import { editarCuadriculaDesdeComisaria } from '../../../api/CRUD/unidades.crud';

type expandedComponentsUnidadesProps = {
    data: any
    municipio: string
    comisaria: string
}
import Swal from 'sweetalert2';

function expandedComponentsUnidades({ data, municipio, comisaria }: expandedComponentsUnidadesProps) {


    const { register, handleSubmit, setValue, formState: { errors } } = useForm();

        return (
            <div className='p-4'>
                <h1 className='text-4xl'>Cuadriculas</h1>
                <form  className='w-full flex flex-col items-center justify-center m-4'
                    onSubmit={handleSubmit((values) => {
                        Swal.fire({
                            title: '¿Estás seguro de editar la cuadrícula?',
                            icon: 'warning',
                            confirmButtonColor: '#0C4A6E',
                            cancelButtonColor: '#FF554C',
                            showCancelButton: true,
                            confirmButtonText: 'Sí, editar',
                            cancelButtonText: 'Cancelar'
                        }).then(async (result) => {
                            if (result.isConfirmed) {
                                values.nombre_comisaria = comisaria
                                values.nombre_municipio = municipio
                                values.nombre_original = data.nombre
                                editarCuadriculaDesdeComisaria(values)
                                Swal.fire({
                                    title: '¡Cuadrícula editada!',
                                    icon: 'success',
                                    confirmButtonColor: '#0C4A6E',
                                    confirmButtonText: 'Ok'
                                }).then(() => {
                                    window.location.reload()
                                })
                            }
                        })

                    }
                    )}
                >
                    <InputRegister campo="Nombre" nombre="nombre_cuadricula" register={register} type="text" error={errors.nombre_cuadricula} valor={data.nombre} setValue={setValue} />
                    <InputRegister campo="Valor" nombre="valor_cuadricula" register={register} type="text" error={errors.nombre_valor} valor={data.value} setValue={setValue} />
                    <button className='bg-sky-950 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded w-4/10 md:w-3/10 mr-2'>
                        Editar cuadrícula
                    </button>
                
                </form>
                </div>
        )
}

export default expandedComponentsUnidades