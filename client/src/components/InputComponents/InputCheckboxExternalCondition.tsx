import { useEffect, useState } from 'react';

interface Props {
    campo: string;
    nombre: string;
    setValue: any;
    register: any;
    type: string;
    error?: any;
    setHook?: any;
    state?: any;
    id: any;
}

function InputCheckbox({ campo, nombre, setValue, type, setHook, state, id }: Props) {
  // Paso 2 y 3: Estado local para manejar el estado del checkbox
  const [isChecked, setIsChecked] = useState(state);

  // Paso 4: Efecto para sincronizar el estado local con la prop [`state`](command:_github.copilot.openSymbolFromReferences?%5B%7B%22%24mid%22%3A1%2C%22fsPath%22%3A%22c%3A%5C%5CUsers%5C%5Cgonza%5C%5COneDrive%5C%5CP%C3%A1ginaWebPolicia%5C%5Cclient%5C%5Csrc%5C%5Ccomponents%5C%5CInputComponents%5C%5CInputCheckbox.tsx%22%2C%22_sep%22%3A1%2C%22external%22%3A%22file%3A%2F%2F%2Fc%253A%2FUsers%2Fgonza%2FOneDrive%2FP%25C3%25A1ginaWebPolicia%2Fclient%2Fsrc%2Fcomponents%2FInputComponents%2FInputCheckbox.tsx%22%2C%22path%22%3A%22%2Fc%3A%2FUsers%2Fgonza%2FOneDrive%2FP%C3%A1ginaWebPolicia%2Fclient%2Fsrc%2Fcomponents%2FInputComponents%2FInputCheckbox.tsx%22%2C%22scheme%22%3A%22file%22%7D%2C%7B%22line%22%3A11%2C%22character%22%3A4%7D%5D "client/src/components/InputComponents/InputCheckbox.tsx")
  useEffect(() => {
    setIsChecked(state);
  }, [state]);

  // Paso 5: Actualiza el estado local y el externo cuando el checkbox cambia
  const handleChange = (e: any) => {
    const checked = e.target.checked;
    setIsChecked(checked); // Actualiza el estado local
    setValue(nombre, checked); // Actualiza el estado externo
    if (setHook) {
      setHook(checked);
    }
  };

  // Paso 6: Usa `checked` en lugar de `defaultChecked`
  return (
    <div className="flex flex-row justify-start items-center">
      <div>
        <input
          className="border open-sans border-gray-300 rounded-md h-6 xl:h-6 xl:w-5 2xl:h-6 my-2 xl:my-1 xl:m-2 m-4 pl-2"
          type={type}
          onChange={handleChange}
          checked={isChecked} // Controla el estado del checkbox
          id={id}
        />
      </div>
      <div>
        <label htmlFor={id} className="font-medium xl:text-sm">
          {campo}
        </label>
      </div>
    </div>
  );
}

export default InputCheckbox;