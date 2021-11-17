import React from "react"
import Radio from "./Radio"

const RadioFormField = ({ radioDiv, value, setValue }) => {
  const { name, options } = radioDiv

  return (
    <div className="grid gap-2">
      <p className="text-sm font-medium text-gray-700">구분</p>
      <div className="flex gap-24">
        {options.map((item) => (
          <Radio
            key={item.key}
            name={name}
            inputId={item.key}
            label={item.label}
            isChecked={value === item.key ? true : false}
            setValue={setValue}
          />
        ))}
      </div>
    </div>
  )
}

export default RadioFormField
