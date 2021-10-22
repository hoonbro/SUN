function LabelInput({ label = "", onChange, errors = {}, ...rest }) {
  return (
    <div className="label_input">
      <label>{label}</label>
      <input onChange={onChange} {...rest} />
      {Object.keys(errors).map((key) => (
        <div key={key}>{errors[key]}</div>
      ))}
    </div>
  )
}

export default LabelInput
