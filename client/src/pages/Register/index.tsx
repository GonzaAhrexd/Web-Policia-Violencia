import { useForm } from 'react-hook-form'
import InputRegister from '../../components/InputRegister'
import SelectRegister from '../../components/SelectRegister'
import { useState } from 'react';


function Register() {
  const { register, handleSubmit, setValue } = useForm()
  const unidadCampos = [
    //LAPACHITO
    { nombre: "División Violencia Familiar y Género Lapachito", value: "Lapachito" },
    //LA LEONESA
    { nombre: "División Violencia Familiar y Género La Leonesa", value: "La Leonesa" },
    //METROPOLITANA
    {
      nombre: "División Violencia Familiar y Género Metropolitana", value: "Metropolitana",
      subdivisiones: [
        //RESISTENCIA
        {
          nombre: "Resistencia", value: "Resistencia", subdivisiones: [
            { nombre: "Comisaría Primera", value: "Comisaría Primera" },
            { nombre: "Comisaría Segunda", value: "Comisaría Segunda" },
            { nombre: "Comisaría Tercera", value: "Comisaría Tercera" },
            { nombre: "Comisaría Cuarta", value: "Comisaría Cuarta" },
            { nombre: "Comisaría Quinta", value: "Comisaría Quinta" },
            { nombre: "Comisaría Sexta", value: "Comisaría Sexta" },
            { nombre: "Comisaría Séptima", value: "Comisaría Séptima" },
            { nombre: "Comisaría Octava", value: "Comisaría Octava" },
            { nombre: "Comisaría Novena", value: "Comisaría Novena" },
            { nombre: "Comisaría Décima", value: "Comisaría Décima" },
            { nombre: "Comisaría Décimo Primera", value: "Comisaría Décimo Primera" },
            { nombre: "Comisaría Décimo Segunda", value: "Comisaría Décimo Segunda" },
            { nombre: "Comisaría Décimo Tercera", value: "Comisaría Décimo Tercera" },
          ]
        },
        //BARANQUERAS
        {
          nombre: "Barranqueras", value: "Barranqueras", subdivisiones: [
            { nombre: "Comisaría Primera", value: "Comisaría Primera" },
            { nombre: "Comisaría Segunda", value: "Comisaría Segunda" },
            { nombre: "Comisaría Tercera", value: "Comisaría Tercera" },
          ]
        },
        //FONTANA
        {
          nombre: "Fontana", value: "Fontana", subdivisiones: [
            { nombre: "Comisaría Primera", value: "Comisaría Primera" },
            { nombre: "Comisaría Segunda", value: "Comisaría Segunda" },
          ]
        },
        //OTROS
        { nombre: "Puerto Vilelas", value: "Puerto Vilelas" },
        { nombre: "Puerto Tirol", value: "Puerto Tirol" },
        { nombre: "Colonia Benitez", value: "Colonia Benitez" },
        { nombre: "Margarita Belén", value: "Margarita Belén" },
        { nombre: "Isla del Cerrito", value: "Isla del Cerrito" },
        { nombre: "Cote Lai", value: "Cote Lai" },
        { nombre: "Basail", value: "Basail" },
        { nombre: "Charadai", value: "Charadai" },
        { nombre: "General Vedia", value: "General Vedia" },
        { nombre: "La Escondida", value: "La Escondida" },
        { nombre: "La Leonesa", value: "La Leonesa" },
        { nombre: "La Verde", value: "La Verde" },
        { nombre: "Las Palmas", value: "Las Palmas" },
        { nombre: "Colonia Popular", value: "Colonia Popular" },
        { nombre: "Makallé", value: "Makallé" },
        { nombre: "Puerto Bermejo", value: "Puerto Bermejo" },
        { nombre: "Eva Perón", value: "Eva Perón" },
      ]
    },
    //VILLA ANGELA
    {
      nombre: "División Violencia Familiar y Género Villa Angela", value: "Villa Angela", subdivisiones: [
        { nombre: "Comisaría Primera", value: "Comisaría Primera" },
        { nombre: "Comisaría Segunda", value: "Comisaría Primera" },
        { nombre: "Comisaría La Clotilde", value: "Comisaría La Clotilde" },
        { nombre: "Comisaría La Tigra", value: "Comisaría La Tigra" },
        { nombre: "Comisaría San Bernardo", value: "Comisaría San Bernardo" },
        { nombre: "Comisaría Villa Berthet", value: "Comisaría Villa Berthet" },
        { nombre: "Comisaría Samuhu", value: "Comisaría Samuhu" },
        { nombre: "Comisaría Chorotis", value: "Comisaría Chorotis" },
        { nombre: "Comisaría Coronel Du Gratty", value: "Comisaría Coronel Du Gratty" },
        { nombre: "Comisaría Enrique Urien", value: "Comisaría Enrique Urien" },
        { nombre: "Comisaría Santa Sylvina", value: "Comisaría Santa Sylvina" },
      ]
    },
    //CHARATA
    {
      nombre: "División Violencia Familiar y Género Charata", value: "Charata", subdivisioens: [
        { nombre: "Comisaría Primera", value: "Comisaría Primera" },
        { nombre: "Comisaría Segunda", value: "Comisaría Segunda" },
        { nombre: "Comisaría Corcuela", value: "Comisaria Corcuela" },
        { nombre: "Comisaría Las Breñas", value: "Comisaría Las Breñas" },
        { nombre: "Comisaría Campo Largo", value: "Comisaría Campo Largo" },
        { nombre: "Comisaría Concepción del Bermejo", value: "Comisaría Concepción del Bermejo" },
        { nombre: "Comisaría Los Frentones", value: "Comisaría Los Frentones" },
        { nombre: "Comisaría Pampa del Infierno", value: "Comisaría Pampa del Infierno" },
        { nombre: "Comisaría Taco Pozo", value: "Comisaría Taco Pozo" },
        { nombre: "Comisaría Gancedo", value: "Comisaría Gancedo" },
        { nombre: "Comisaría General Pinedo", value: "Comisaría General Pinedo" },
        { nombre: "Comisaría General Capdevila", value: "Comisaría General Capdevila" },
        { nombre: "Comisaría Hermoso Campo", value: "Comisaría Hermoso Campo" }
      ]
    },
    //General San Martin
    {
      nombre: "División Violencia Familiar y Género Gral. San Martin", value: "General San Martín", subdivisiones: [
        { nombre: "Comisaría General San Martin", value: "Comisaría General San Martin" },
        { nombre: "Comisaría Pampa del Indio", value: "Comisaría Pampa del Indio" },
        { nombre: "Comisaría Presidencia Roca", value: "Comisaría Presidencia Roca" },
        { nombre: "Comisaría Capital Solari", value: "Comisaría Capital Solari" },
        { nombre: "Comisaría Ciervo Petiso", value: "Comisaría Ciervo Petiso" },
        { nombre: "Comisaría Colonia Unidas", value: "Comisaría Colonia Unidas" },
        { nombre: "Comisaría Claguna Limpia", value: "Comisaría Claguna Limpia" },
        { nombre: "Comisaría Las Garcitas", value: "Comisaría Las Garcitas" },
        { nombre: "Comisaría La Eduvigis", value: "Comisaría La Eduvigis" },
        { nombre: "Comisaría Selvas del Río de Oro", value: "Comisaría Selvas del Río de Oro" },
        { nombre: "Comisaría Pampa Almirón", value: "Comisaría Pampa Almirón" },
        { nombre: "Comisaría Colonia Elisa", value: "Comisaría Colonia Elisa" },
      ]
    },
    //Juan José Castelli
    {
      nombre: "División Violencia Familiar y Género Metropolitana Juan José Castelli", value: "Juan José Castelli", subdivisiones: [
        { nombre: "Comisaría Primera Juan José Castelli", value: "Comisaría Primera Juan José Castelli" },
        { nombre: "Comisaría Segunda Juan José Castelli", value: "Comisaría Segunda Juan José Castelli" },
        { nombre: "Comisaría Tres Isletgas", value: "Comisaría Tres Isletas" },
        { nombre: "Comisaría El Espinillo", value: "Comisaría El Espinillo" },
        { nombre: "Comisaría Fuerte Esperanza", value: "Comisaría Fuerte Esperanza" },
        { nombre: "Comisaría Miraflores", value: "Comisaría Miraflores" },
        { nombre: "Comisaría Villa Río Bermejito", value: "Comisaría Villa Río Bermejito" },
        { nombre: "Comisaría Comandancia Frias", value: "Comisaría Comandancia Frias" },
        { nombre: "Comisaría El Sauzalito", value: "Comisaría El Sauzalito" },
        { nombre: "Destacamento F. Belgrano", value: "Destacamento F. Belgrano" },
        { nombre: "Destacamento Tres Pozos", value: "Destacamento Tres Pozos" },
        { nombre: "Destacamento El Taragal", value: "Destacamento El Taragal" },
        { nombre: "Comisaría Misión Nueva Pompeya", value: "Comisaría Misión Nueva Pompeya" },
        { nombre: "Comisaría Wichi El Pintado", value: "Comisaría Wichi El Pintado" },
      ]
    },
    //Roque Saenz Peña
    {
      nombre: "División Violencia Familiar y Género Presidencia Roque Saenz Peña", value: "Roque Saenz Peña", subdivisiones: [
        { nombre: "Comisaría Primera Presidencia Roque Saenz Peña", value: "Comisaría Primera Presidencia Roque Saenz Peña" },
        { nombre: "Comisaría Segundo Presidencia Roque Saenz Peña", value: "Comisaría Segundo Presidencia Roque Saenz Peña" },
        { nombre: "Comisaría Tercera Presidencia Roque Saenz Peña", value: "Comisaría Tercera Presidencia Roque Saenz Peña" },
        { nombre: "Comisaría Cuarta Presidencia Roque Saenz Peña", value: "Comisaría Cuarta Presidencia Roque Saenz Peña" },
        { nombre: "Comisaría Quinta Presidencia Roque Saenz Peña", value: "Comisaría Quinta Presidencia Roque Saenz Peña" },
        { nombre: "Comisaría Sexta Presidencia Roque Saenz Peña", value: "Comisaría Sexta Presidencia Roque Saenz Peña" },
        { nombre: "Comisaría El Tacuruzal", value: "Comisaría El Tacuruzal" },
        { nombre: "Comisaría Machagai", value: "Comisaría Machagai" },
        { nombre: "Comisaría Presidencia de la Plaza", value: "Comisaría Presidencia de la Plaza" },
        { nombre: "Comisaría Quitilipi", value: "Comisaría Quitilipi" },
        { nombre: "Comisaría Colonia Aborigen", value: "Comisaría Colonia Aborigen" },
        { nombre: "Comisaría Avia Terai", value: "Comisaría Avia Terai" },
        { nombre: "Comisaría Napenay", value: "Comisaría Napenay" },
      ]
    },
  ];

  const jerarquiaCampos = [
    { nombre: "Agente", value: "Agente" },
    { nombre: "Cabo", value: "Cabo Primero" },
    { nombre: "Sargento", value: "Sargento" },
    { nombre: "Sargento Ayudante", value: "Sargento Ayudante" },
    { nombre: "Suboficial Principal", value: "Suboficial Principal" },
    { nombre: "Suboficial Mayor", value: "Suboficial Mayor" },
    { nombre: "Oficial Subayudante", value: "Oficial Ayudante" },
    { nombre: "Oficial Auxiliar", value: "Oficial Principal" },
    { nombre: "Subcomisario", value: "Subcomisario" },
    { nombre: "Comisario", value: "Comisario" },
    { nombre: "Comisario Principal", value: "Comisario Principal" },
    { nombre: "Comisario Inspector", value: "Comisario Inspector" },
    { nombre: "Comisario Mayor", value: "Comisario Mayor" },
    { nombre: "Comisario General", value: "Comisario General" },

  ]

  return (
    <div className='
      gradient 
      h-screen w-screen
      md:flex md:flex-col md:items-center md:align-top md:justify-center
      '
    >
      <div className='
        flex flex-row align-middle justify-center bg-white 
       
        h-screen w-screen mt-40 
       
        sm:h-auto sm:w-auto sm:rounded-md sm:mt-40
       
        md:h-5/6 md:w-4/6 md:rounded-md md:mt-0
       
        lg:h-5/6 lg:w-4/6 lg:rounded-md lg:mt-0
       
        xl:h-5/6 xl:w-4/6 xl:rounded-md xl:mt-0
       
        2xl:h-5/6 2xl:w-2/5 2xl:rounded-md 2xl:mt-0
        '>
        <div className='w-screen flex flex-col items-center align-middle justify-center'>
          <h1 className='open-sans text-3xl font-semibold'>¡Registrate ahora!</h1>
          <form className='flex flex-col align-middle justify-center w-5/6 sm:w-3/5 ' onSubmit={handleSubmit((values) => {
            console.log(values)
          })}>
            <div className='flex flex-col md:flex-row'>
              <InputRegister campo="Nombre" nombre="nombre" register={register} setValue={setValue}/>
              <InputRegister campo="Apellido" nombre="apellido" register={register} setValue={setValue}/>
            </div>
            <div className='flex flex-col md:flex-row'>
              <InputRegister campo="Teléfono" nombre="telefono" placeholder={"Ej. 3624123456"} register={register} setValue={setValue}/>
              <InputRegister campo="Nombre de usuario" nombre="username"  register={register} setValue={setValue}/>
            </div>
            <div className='flex flex-col md:flex-row'>
              <InputRegister campo="Contraseña" nombre="pass" register={register}/>
              <InputRegister campo="Repite la contraseña" nombre="passrepeat"  register={register} setValue={setValue}/>
            </div>
            <div className='flex flex-col md:flex-row'>
              <InputRegister campo="N° de Credencial" nombre="credencial"  register={register} setValue={setValue}/>
              {/*@ts-ignore*/}
              <SelectRegister campo="Jerarquía" opciones={jerarquiaCampos} register={register} setValue={setValue}/>
            </div>
            <div className='flex flex-col md:flex-row'>
              <InputRegister campo="N° de Plaza" nombre="plaza"  register={register} setValue={setValue}/>
              <InputRegister campo="Zona" nombre="jerarquia" register={register} setValue={setValue}/>
            </div>
            {/*@ts-ignore*/}
            <SelectRegister campo="Unidad" opciones={unidadCampos}  register={register}setValue={setValue}/>

            <div className='flex flex-col m-4'>
              <div className='flex flex-col md:w-full'>
                <span>DNI en formato PDF</span>
                <input name="pdf" type="file" accept=".pdf" />
              </div>
            </div>

            <div className='flex flex-col md:flex-row'>
              <button className='bg-sky-900 hover:bg-sky-700 text-white w-full h-10 rounded-md my-2'>Crear cuenta</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}




export default Register
