import React from 'react'

function ShowTextArea({campo, dato}) {
  return (
    <div className={`flex flex-col w-full`}>
    <span className={`font-medium ml-4 xl:text-vw`}></span>
    <textarea className="border open-sans pl-4 py-5 resize-none text-lg border-gray-300 rounded-md w-full h-60 " value={dato}></textarea>
</div>
  )
}

export default ShowTextArea