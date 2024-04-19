import React from 'react'

//@ts-ignore
function CardIndividualInfo({ campo, svg, tipoStroke, tipoFill}) {
    return (
        <div className="flex text-gray-300 items-center justify-center ">
            <svg className="h-5 w-5 text-gray-200 mr-1" strokeWidth={1.5}  fill={tipoFill}  
                xmlns="http://www.w3.org/2000/svg" stroke={tipoStroke}  viewBox="0 0 24 24" width="24" height="24">
                <path  strokeLinecap="round" strokeLinejoin="round" className=""
                    d={svg} />
            </svg>
            {campo}
        </div>
        
    )
}




export default CardIndividualInfo