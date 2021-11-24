import { useState } from "react"
import { VscSymbolString } from "react-icons/vsc"

const LabelInput = ({
  label = "",
  onChange = (f) => f,
  errors = {},
  type = "string",
  ...rest
}) => {
  const [inputType, setInputType] = useState(type)

  return (
    <div className="form-field">
      <label htmlFor={label}>{label}</label>
      <div className="input-wrapper">
        <input id={label} onChange={onChange} type={inputType} {...rest} />
        {type === "password" && (
          <div
            className="absolute top-2 right-2 cursor-pointer"
            onClick={() =>
              setInputType((prev) =>
                prev === "string" ? "password" : "string"
              )
            }
          >
            <VscSymbolString size="24px" />
          </div>
        )}
      </div>
      {Object.keys(errors).length !== 0 && (
        <div className="errors grid gap-0.5">
          {Object.keys(errors).map((key) => (
            <div className="text-red-500 text-sm font-medium" key={key}>
              {errors[key]}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default LabelInput
