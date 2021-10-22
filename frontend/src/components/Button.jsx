function Button({ children, disabled }) {
  return (
    <button
      className={`w-full py-3 font-bold rounded-md ${
        disabled ? "bg-gray-50 text-gray-400" : "bg-red-500 text-white"
      }`}
    >
      {children}
    </button>
  )
}

export default Button
