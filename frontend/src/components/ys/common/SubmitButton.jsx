import React from "react"

const SubmitButton = ({ disabled, children, handleSubmitButtonClick }) => {
  const customClassName = disabled
    ? " bg-gray-50 text-gray-400 "
    : " bg-red-500 text-white "

  return (
    <button
      className={"w-full py-4 font-bold rounded-md " + customClassName}
      disabled={disabled}
      onClick={handleSubmitButtonClick}
    >
      {children}
    </button>
  )
}

export default SubmitButton
