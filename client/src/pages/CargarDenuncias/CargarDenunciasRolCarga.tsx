// Hooks
import { useForm } from 'react-hook-form';
import { useState } from 'react';

// Conexión con BackEnd
import { crearDenuncia, agregarVictima, agregarVictimario, crearTercero } from '../../api/crud';

// Librerías React
import Swal from 'sweetalert2'

// Componentes
import CargarVictima from '../../components/Cargar/CargarVictima';
import CargarVictimario from '../../components/Cargar/CargarVictimario';
import CargarDenuncia from '../../components/Cargar/CargarDenuncia';
import CargarObservaciones from '../../components/Cargar/CargarObservaciones';
import BuscarExistenteModal from '../../components/ModalBusqueda/BuscarExistenteModal';
import EditVictima from '../../components/EditMode/EditVictima';
import EditVictimario from '../../components/EditMode/EditVictimario';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
interface CargarDenunciasRolCargaProps {
    user: any;
    handleOpenModal: any;
    setTitulo: any;
    }

function CargarDenunciasRolCarga({setTitulo, user, handleOpenModal}: CargarDenunciasRolCargaProps) {
    const {  register, handleSubmit, setValue, formState: {
        errors
      } } = useForm()
      
      const [openModalVictima, setOpenModalVictima] = useState(false)
      const [openModalVictimario, setOpenModalVictimario] = useState(false)
      const [openModalTercero, setOpenModalTercero] = useState(false)
      const [victimaCargar, setVictimaCargar] = useState(null)
      const [victimarioCargar, setVictimarioCargar] = useState(null)
  return (
    <div className='h-screen sm:h-full p-2 sm:p-10'>
          <h2 className='text-3xl my-5'>Cargar nueva denuncia</h2>
          <div>

            <div className='flex items-center'>
            <h1 className='text-2xl my-5'>Víctima</h1> 
                    <MagnifyingGlassIcon className='flex items-center justify-center cursor-pointer text-black font-bold py-2 mx-5 rounded w-10 h-10' onClick={() => setOpenModalVictima(true)}/>
              </div>
            {openModalVictima && <BuscarExistenteModal variante={"Víctima"} setOpenModal={setOpenModalVictima} setVictimaCargar={setVictimaCargar} />}
            {openModalVictimario && <BuscarExistenteModal variante={"Victimario"} setOpenModal={setOpenModalVictimario} setVictimaCargar={setVictimarioCargar} /> }
            <form onSubmit={
              handleSubmit(async (values) => {
                const idVictima = await agregarVictima(values).then((id) => {
                  console.log(id)
                  return id
                })
                values.dni_victimario = values.dni_victimario ? values.dni_victimario : 'S/N'
                const idVictimario = await agregarVictimario(values).then((id) => {
                  console.log(id)
                  return id
                })
                const idTercero = await crearTercero(values).then((id) => {
                  console.log(id)
                  return id
                })

                console.log(values)

                values.victima_ID = idVictima
                values.victimario_ID = idVictimario
                values.tercero_ID = idTercero
                
                console.log(idTercero)

                if (!values.Expediente) {
                  values.Expediente = 'S/N'
                  values.is_expediente_completo = false
                } else {
                  values.is_expediente_completo = true
                }
                values.user_id = user.id
                values.numero_de_expediente = values.PrefijoExpediente + values.numero_de_expediente + values.Expediente + values.SufijoExpediente
                  try{
                    crearDenuncia(values)
                    Swal.fire({
                      title: '¡Denuncia enviada!',
                      text: 'La denuncia ha sido cargada con éxito',
                      icon: 'success',
                      confirmButtonText: 'Aceptar',
                      confirmButtonColor: '#0C4A6E',    
                    }).then((result) => {
                      if (result.isConfirmed) {
                  //       window.location.reload();
                      }
                    })
                  }catch(error){
                    console.log(error)
                  }
              })}>
             
              {!victimaCargar ? 
              <div className='flex justify-center'>
                <CargarVictima register={register} setValue={setValue} errors={errors} />
              </div>
              :
              <div className='flex justify-center'>
                <EditVictima md={true} datos={victimaCargar} register={register} setValue={setValue} errors={errors}/>
              </div>

              }
               <div className='flex items-center'>
              <h1 className='text-2xl my-5'>Victimario</h1>
                    <MagnifyingGlassIcon className='flex items-center justify-center cursor-pointer text-black font-bold py-2 mx-5 rounded w-10 h-10' onClick={() => setOpenModalVictimario(true)}/>
              </div>
              {!victimarioCargar ? 
              <div className='flex justify-center'>
                <CargarVictimario register={register} setValue={setValue} errors={errors} />
              </div>
              :
              <div className='flex justify-center'>
                <EditVictimario md={true} datos={victimarioCargar} register={register} setValue={setValue} errors={errors}/>
              </div>
              }
              <h1 className='text-2xl my-5'>Hecho</h1>
              <div className='flex justify-center'>
                <CargarDenuncia setTitulo={setTitulo} register={register} setValue={setValue} errors={errors} handleOpenModal={handleOpenModal} />
              </div>
              <h1 className='text-2xl my-5'>Observaciones o denuncia</h1>
              <div className='flex justify-center h-80'>
                <CargarObservaciones register={register} />
              </div>
              <div className="flex justify-center my-3">
               <button className='bg-sky-950 hover:bg-sky-900 text-white font-bold py-2 px-4 rounded w-6/10' type="submit">Enviar</button>
              </div>
            </form>
          </div>
          </div>

  )
}

export default CargarDenunciasRolCarga