import InfoText from './InfoText'

// @ts-ignore
function CardsInfoProfile({user}) {
  return (

    <div className="h-full bg-gray-950 pt-12 rounded-xl ">
            <div className="mx-auto w-95/100 h-95/100 bg-gray-600 rounded-lg overflow-hidden shadow-lg">
                <div className='flex flex-col'>
                <div className='flex flex-col md:flex-row justify-evenly'>
                <InfoText campo="Nombre" valor={user.nombre}/>
                <InfoText campo="Apellido" valor={user.apellido}/>
              </div>
              <div className='flex flex-col md:flex-row justify-evenly'>
                 <InfoText campo="Teléfono" valor={user.teléfono}/>
                 <InfoText campo="Nombre de Usuario" valor={user.nombre_de_usuario}/>
          
              </div>
           
              <div className='flex flex-col md:flex-row justify-evenly'>
                 <InfoText campo="Credencial" valor={user.credencial}/>
                 <InfoText campo="Jerarquía" valor={user.jerarquia}/>
               </div>
              <div className='flex flex-col md:flex-row'>
         
              <div className='flex flex-col md:flex-row justify-evenly'>
                 <InfoText campo="N° de Plaza" valor={user.plaza}/>
                 <InfoText campo="Zona" valor={user.zona}/>
               </div>
              </div>
              
              <div className='flex flex-col md:flex-row'>
         
              <div className='flex flex-col md:flex-row justify-evenly'>
                 <InfoText campo="Unidad" valor={user.unidad}/>
                 </div>
              </div>
              </div>
            </div>
        </div>

)
}

export default CardsInfoProfile