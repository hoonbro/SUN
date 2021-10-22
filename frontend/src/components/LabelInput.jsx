function LabelInput({ label = "", onChange, ...rest }) {
  return (
    <div className="label_input">
      <label>{label}</label>
      <input onChange={onChange} {...rest} />
    </div>
  )
}

export default LabelInput
