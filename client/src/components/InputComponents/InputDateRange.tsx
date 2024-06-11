import { useState } from 'react';
import DateRangePicker from '@wojtekmaj/react-daterange-picker';
//import '@wojtekmaj/react-daterange-picker/dist/DateRangePicker.css';
import '../../App.css';
//import 'react-calendar/dist/Calendar.css';
import { CalendarIcon } from '@heroicons/react/24/outline';
type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

interface InputDateRangeProps {
  register: any;
  setValue: any;
  isRequired: boolean;
}

function InputDateRange({ register, setValue, isRequired }: InputDateRangeProps) {

  const [date, setDate] = useState<Value>([null, null]);

  const handleDate = (dates: [Date, Date] | null) => {
    if (dates !== null) {
      const [desde, hasta] = dates;

      // Crear objetos Date con las fechas proporcionadas
      const localDesde = new Date(desde);
      const localHasta = new Date(hasta);

      // Extraer solo los componentes de día, mes y año
      const utcDesdeYear = localDesde.getFullYear();
      const utcDesdeMonth = localDesde.getMonth() + 1; // Meses empiezan en 0, así que sumamos 1
      const utcDesdeDay = localDesde.getDate();

      const utcHastaYear = localHasta.getFullYear();
      const utcHastaMonth = localHasta.getMonth() + 1; // Meses empiezan en 0, así que sumamos 1
      const utcHastaDay = localHasta.getDate();

      // Crear las fechas en formato YYYY-MM-DD
      const desdeFormatted = `${utcDesdeYear}-${utcDesdeMonth.toString().padStart(2, '0')}-${utcDesdeDay.toString().padStart(2, '0')}`;
      const hastaFormatted = `${utcHastaYear}-${utcHastaMonth.toString().padStart(2, '0')}-${utcHastaDay.toString().padStart(2, '0')}`;

      // Imprimir las fechas en formato YYYY-MM-DD
      console.log("Fecha desde:", desdeFormatted);
      console.log("Fecha hasta:", hastaFormatted);

      // Llamar a setDate con las fechas formateadas
      setDate([desde, hasta]);
      setValue("desde", desdeFormatted);
      setValue("hasta", hastaFormatted);
  }
}

  return (
    <div className="flex flex-col w-full xl:w-1/2">
      <span className="font-medium ml-4 xl:text-vw"> Rango de fechas </span>
      <DateRangePicker className="flex items-center justify-center align-center border open-sans border-gray-300 rounded-md h-10 xl:h-8 2xl:h-10 my-2 xl:my-1 xl:m-2 m-4 pl-2" onChange={(date:any) => { handleDate(date)}} value={date}  clearIcon={null} calendarIcon={<CalendarIcon className='h-6 w-6'/>} required={isRequired} />
    </div>

  );
}

export default InputDateRange;