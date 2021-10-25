import React, { useState } from "react"
import { VscSymbolString } from "react-icons/vsc"

const InputFormField = ({ field, setField, handleBlur }) => {
  const [inputType, setInputType] = useState(field.type)

  const handleChange = (e) => {
    setField({ ...field, value: e.target.value })
  }

  return (
    <div className="label_input">
      <label htmlFor={field.key}>{field.label}</label>
      <div className="grid gap-1">
        <div className="input-wrapper">
          <input
            type={inputType}
            id={field.key}
            placeholder={field.placeholder}
            value={field.value}
            disabled={field.disabled}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {field.type === "password" && (
            <div
              className="absolute top-2 right-2 cursor-pointer"
              onClick={() =>
                setInputType((prev) => (prev === "text" ? "password" : "text"))
              }
            >
              <VscSymbolString size="24px" />
            </div>
          )}
        </div>
        <p className="text-xs text-red-500 pl-2">{field.error}</p>
      </div>
    </div>
  )
}

export default InputFormField
