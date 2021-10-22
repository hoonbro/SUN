import React from "react"

const Radio = ({ name, inputId, label, isChecked, setValue }) => {
  const handleChange = (e) => {
    setValue(e.target.value)
  }

  let radioButton
  if (isChecked) {
    radioButton = <span className="material-icons">radio_button_checked</span>
  } else {
    radioButton = <span className="material-icons">radio_button_unchecked</span>
  }

  return (
    <>
      <input
        type="radio"
        name={name}
        id={inputId}
        value={inputId}
        className="hidden"
        onChange={handleChange}
      />
      <label
        htmlFor={inputId}
        className="text-gray-900 flex gap-1 items-center"
      >
        {radioButton}
        {label}
      </label>
    </>
  )
}

export default Radio
