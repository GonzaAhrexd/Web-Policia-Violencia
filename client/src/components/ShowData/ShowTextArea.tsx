
interface ShowTextAreaProps {
  campo?: string;
  dato: string;
}
function ShowTextArea({ dato}:ShowTextAreaProps) {
  return (
    <div className={`flex flex-col w-full`}>
    <div className="border open-sans pl-4 py-5 resize-none text-lg border-gray-300 rounded-md w-full h-60 ">{dato}</div>
</div>
  )
}

export default ShowTextArea