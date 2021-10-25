function LabelInput({ label = "", onChange = (f) => f, errors = {}, ...rest }) {
  return (
    <div className="label_input">
      <label htmlFor={label}>{label}</label>
      <input id={label} onChange={onChange} {...rest} />
      {Object.keys(errors).map((key) => (
        <div key={key}>{errors[key]}</div>
      ))}
    </div>
  )
}

export default LabelInput
