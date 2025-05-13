

type OpcionesCheckboxAcumulador = {
    opciones: any;
    setStringAcumulador: any;
    stringAcumulador: string;
}

function InputCheckboxAcumulador({ opciones, setStringAcumulador, stringAcumulador }: OpcionesCheckboxAcumulador) {


    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>, nombre: string) => {
        const checked = e.target.checked;
        const items = stringAcumulador ? stringAcumulador.split(", ") : [];

        let nuevosItems = checked
            ? [...items, nombre]
            : items.filter(item => item !== nombre);

        setStringAcumulador(nuevosItems.join(", "));
    };

    return (
        <>
            {opciones.map((autoridad: any) => (
                <div key={autoridad.id} className="flex flex-row justify-start items-center">
                    <div>
                        <input
                            className="cursor-pointer border open-sans border-gray-300 rounded-md h-6 xl:h-6 xl:w-5 2xl:h-6 my-2 xl:my-1 xl:m-2 m-4 pl-2"
                            type="checkbox"
                            onChange={(e) => handleCheckboxChange(e, autoridad.nombre)}
                            id={autoridad.id}
                        />
                    </div>
                    <div>
                        <label htmlFor={autoridad.id} className="cursor-pointer font-medium xl:text-sm">
                            {autoridad.nombre}
                        </label>
                    </div>
                </div>
            ))}
        </>
    );
}

export default InputCheckboxAcumulador