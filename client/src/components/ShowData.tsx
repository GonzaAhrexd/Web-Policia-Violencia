import React from 'react'

interface ShowDataProps {
  campo: string;
  dato: string;
}

function ShowData({campo, dato}:ShowDataProps) {
  return (
    <div className={`flex flex-col w-full`}>
    <span className={`font-medium ml-4 xl:text-vw`}> {campo} </span>
    <div className={`border open-sans border-gray-300 rounded-md h-10 xl:h-8 2xl:h-10 my-2 xl:my-1 xl:m-2 m-4 pl-2 flex items-center`}>
        {dato}
    </div>
</div>
  )
}

export default ShowData