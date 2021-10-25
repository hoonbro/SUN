import React, { useRef } from "react"

const InputFormField = ({ field, setField, handleBlur }) => {
  const handleChange = (e) => {
    setField({ ...field, value: e.target.value })
  }

  return (
    <div className="grid gap-2 w-full">
      <label className="text-sm font-medium text-gray-700" htmlFor={field.key}>
        {field.label}
      </label>
      <div className="grid gap-1">
        <input
          className="border border-gray-300 rounded py-2 px-4 outline-none focus:ring-2 ring-blue-500 text-gray-900"
          type={field.type}
          id={field.key}
          placeholder={field.placeholder}
          value={field.value}
          disabled={field.disabled}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <p>{field.error}</p>
      </div>
    </div>
  )
}

export default InputFormField
