import React from 'react'
import { useForm } from 'react-hook-form'
import { useEffect } from 'react'
//@ts-ignore


interface Props {
    campo: string;
    nombre: string;
    setValue: any;
    register: any;
    type: string;
    error?: any;
    setHook?: any;
    state?: any;
}

function InputCheckbox({ campo, nombre, setValue, register, type, error, setHook, state }:Props) {
    const handleChange = (e:any) => {
      setValue(nombre, e.target.checked);
      if (setHook) {
        setHook(e.target.checked);
      }
    };
  
    return (
      <div className="flex flex-row justify-start">
         <div>
        <input
          className="border open-sans border-gray-300 rounded-md h-6 xl:h-6 xl:w-5 2xl:h-6 my-2 xl:my-1 xl:m-2 m-4 pl-2"
          type={type}
          onChange={handleChange}
          checked={state}
          />
          </div>
        <div>
        <label className="font-medium xl:text-sm">
          {campo}
        </label>
        </div>
       
      </div>
    );
  }

export default InputCheckbox