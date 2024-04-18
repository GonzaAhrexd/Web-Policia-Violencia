import React from 'react';
import { NavLink } from 'react-router-dom';

type Props = {
  mostrar: string;
  url: string;
  svg: string;
  showAdminSection?: boolean;
  setShowAdminSection?: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function CardsActions({
  mostrar,
  url,
  svg,
  showAdminSection,
  setShowAdminSection,
}: Props): JSX.Element {
  return (
    <div className={`rounded-lg p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] hover:bg-sky-950 ${showAdminSection? "bg-sky-950" : "bg-sky-900"}`}>
      {mostrar === 'Mostrar sección admin' ? (
        <div className="flex flex-row justify-between cursor-pointer" onClick={() => setShowAdminSection?.(!showAdminSection)}>
          <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-50">
            {showAdminSection ? 'Ocultar sección admin' : 'Mostrar sección admin'}
          </h5>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="white"
            className="w-6 h-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d={svg} />
          </svg>
        </div>
      ) : (
        <NavLink to={url}>
          <div className="flex flex-row justify-between">
            <h5 className="mb-2 text-xl font-medium leading-tight  text-neutral-50">
              {mostrar}
            </h5>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="white"
              className="w-6 h-6"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d={svg} />
            </svg>
          </div>
        </NavLink>
      )}
    </div>
  );
}