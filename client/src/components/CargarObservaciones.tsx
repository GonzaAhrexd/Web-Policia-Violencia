import React from 'react'
import InputTextArea from './InputTextArea'
import { useForm } from 'react-hook-form'

function CargarObservaciones() {
    const { control, register, handleSubmit, setValue, formState: {
        errors
      } } = useForm()
  return (
    <>
        <InputTextArea campo="Observaciones" nombre="Observaciones" register={register} type="text" ></InputTextArea>
    </>
  )
}

export default CargarObservaciones