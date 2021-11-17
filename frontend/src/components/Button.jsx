function Button({ children, disabled = false }) {
  return (
    <button
      className={`w-full py-3 font-bold rounded-md
      ${disabled ? "bg-gray-100 text-gray-400" : "bg-red-500 text-white"}
      `}
      disabled={disabled}
    >
      {children}
    </button>
  )
}

export default Button
