// Hooks
import { useForm } from 'react-hook-form';
import { useState } from 'react';
// Conexión con BackEnd
import { crearDenuncia, agregarVictima, agregarVictimario, crearTercero } from '../../api/crud';

// Librerías React
import Swal from 'sweetalert2';

// Componentes
import CargarVictima from '../../components/Cargar/CargarVictima';
import CargarVictimario from '../../components/Cargar/CargarVictimario';
import CargarDenuncia from '../../components/Cargar/CargarDenuncia';
import CargarObservaciones from '../../components/Cargar/CargarObservaciones';
import BuscarExistenteModal from '../../components/ModalBusqueda/BuscarExistenteModal';
import EditVictima from '../../components/EditMode/EditVictima';
import EditVictimario from '../../components/EditMode/EditVictimario';

// Iconos
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

interface CargarDenunciasRolCargaProps {
  user: any;
  handleOpenModal: any;
  setTitulo: any;
}

function CargarDenunciasRolCarga({ setTitulo, user, handleOpenModal }: CargarDenunciasRolCargaProps) {
  const { register, watch, handleSubmit, setValue, formState: { errors } } = useForm();

  // Modal de búsqueda de víctima
  const [openModalVictima, setOpenModalVictima] = useState(false);
  // Modal de búsqueda de victimario
  const [openModalVictimario, setOpenModalVictimario] = useState(false);
  // Modal de búsqueda de tercero
  const [openModalTercero, setOpenModalTercero] = useState(false);
  // Datos de la víctima a cargar
  const [victimaCargar, setVictimaCargar] = useState(null);
  // Datos del victimario a cargar
  const [victimarioCargar, setVictimarioCargar] = useState(null);
  // Datos del tercero a cargar
  const [terceroCargar, setTerceroCargar] = useState(null);

  return (
    <div className='h-screen sm:h-full p-2 sm:p-10'>
      <h2 className='text-3xl my-5'>Cargar nueva denuncia</h2>
      <div>
        {openModalVictima && <BuscarExistenteModal variante={"Víctima"} setOpenModal={setOpenModalVictima} setVictimaCargar={setVictimaCargar} />}
        {openModalVictimario && <BuscarExistenteModal variante={"Victimario"} setOpenModal={setOpenModalVictimario} setVictimaCargar={setVictimarioCargar} />}
        {openModalTercero && <BuscarExistenteModal variante={"Tercero"} setOpenModal={setOpenModalTercero} setVictimaCargar={setTerceroCargar} />}
        <form onSubmit={
          handleSubmit(async (values) => {
            // Mostrar una alerta de confirmación antes de cargar la denuncia
            Swal.fire({
              title: '¿Estás seguro?',
              text: "Podrás editarlo más adelante.",
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#0C4A6E',
              cancelButtonColor: '#FF554C',
              confirmButtonText: 'Sí, subir',
              cancelButtonText: 'Cancelar'
            }).then(async (result) => {
              // Si se confirma la carga de la denuncia, comienza la carga al backend
              if (result.isConfirmed) {
                // Crear la víctima y retornar el id
               let idVictima = null;
               let idVictimario = null; 

               values.dni_victima = values.dni_victima ? values.dni_victima : 'S/N';

               if(!values.victima_ID){
                  idVictima = await agregarVictima(values).then((id) => {
                   return id;
                  });
                  values.victima_ID = idVictima;
                }
                // Si no se ingresó DNI, se asigna S/N
                values.dni_victimario = values.dni_victimario ? values.dni_victimario : 'S/N';
                // Crear el victimario y retornar el id
                if(!values.victimario_ID){
                idVictimario = await agregarVictimario(values).then((id) => {
                  return id;
                });
                values.victimario_ID = idVictimario;
              }
                // Crear el tercero y retornar el id
                const idTercero = await crearTercero(values).then((id) => {
                  return id;
                });
                // Asignar a la denuncia los ids de víctima, victimario y tercero
                values.tercero_ID = idTercero;
                // Si no se ingresó expediente, se asigna S/N
                if (!values.Expediente) {
                  values.Expediente = 'S/N';
                  // Si no está completo el expediente, se asigna false
                  values.is_expediente_completo = false;
                } else {
                  // Si está completo el expediente, se asigna true
                  values.is_expediente_completo = true;
                }
                // Asignar el id del usuario a la denuncia
                values.user_id = user.id;
                // Crear el número de expediente en base a los datos ingresados
                values.numero_de_expediente = values.PrefijoExpediente + values.numero_de_expediente + values.Expediente + values.SufijoExpediente;
                try {
                  // Crear la denuncia
                  // console.log(values)
                  await crearDenuncia(values);
                  Swal.fire({
                    title: '¡Denuncia enviada!',
                    text: 'La denuncia ha sido cargada con éxito',
                    icon: 'success',
                    confirmButtonText: 'Aceptar',
                    confirmButtonColor: '#0C4A6E',
                  }).then((result) => {
                    if (result.isConfirmed) {
                      // Si se confirma, recargar la página
                      // window.location.reload();
                    }
                  });
                } catch (error) {
                  Swal.fire({
                    title: 'Error',
                    text: 'Hubo un error al subir la denuncia',
                    icon: 'error',
                    confirmButtonColor: '#0C4A6E',
                  });
                }
              }
            });
          })
        }>
          
          <div className='flex items-center'>
            <h1 className='text-2xl my-5'>Víctima</h1>
            <MagnifyingGlassIcon className='bg-sky-950 hover:bg-sky-700 flex items-center text-white justify-center cursor-pointer font-bold py-2 mx-5 rounded w-10 h-10'  onClick={() => setOpenModalVictima(true)}/>
          </div>
          <div className='flex justify-center'>
            {!victimaCargar ? // Si no hay datos de la víctima a cargar, mostrar el formulario de carga
              <CargarVictima watch={watch} register={register} setValue={setValue} errors={errors} />
              : // Si hay datos de la víctima a cargar, mostrar el formulario de edición
              <EditVictima watch={watch} existente={true} md={true} datos={victimaCargar} register={register} setValue={setValue} errors={errors} />
            }
          </div>
          {/* Haz una linea gris que divida, pero que solo salga a la mitad como los demás inputs */}
          {/* <div className='flex justify-center items-center'> 
            <div className='border-t-2 border-gray-500 my-5 w-6/10'></div>
          </div> */}
          <div className='flex items-center'>
            <h1 className='text-2xl my-5'>Victimario</h1>
            <MagnifyingGlassIcon className='bg-sky-950 hover:bg-sky-700 flex items-center justify-center cursor-pointer text-white font-bold py-2 mx-5 rounded w-10 h-10' onClick={() => setOpenModalVictimario(true)} />
          </div>
          <div className='flex justify-center'>
            {!victimarioCargar ? // Si no hay datos del victimario a cargar, mostrar el formulario de carga
              <CargarVictimario watch={watch} register={register} setValue={setValue} errors={errors} />
              : // Si hay datos del victimario a cargar, mostrar el formulario de edición
              <EditVictimario existente={true} md={true} datos={victimarioCargar} register={register} setValue={setValue} errors={errors} />
            }
          </div>
          <h1 className='text-2xl my-5'>Hecho</h1>
          <div className='flex justify-center'>
            <CargarDenuncia setTercero={terceroCargar} setOpenModalTercero={setOpenModalTercero} setTitulo={setTitulo} register={register} setValue={setValue} errors={errors} handleOpenModal={handleOpenModal} />
          </div>
          <h1 className='text-2xl my-5'>Observaciones</h1>
          <div className='flex justify-center h-80'>
            <CargarObservaciones register={register} />
          </div>
          <div className="flex justify-center my-3">
            <button className='bg-sky-950 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded w-6/10' type="submit">Enviar</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CargarDenunciasRolCarga;
