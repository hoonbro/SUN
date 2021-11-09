import React from "react"

const InfoMessageWrapper = ({ children }) => {
  return (
    <div className="w-full bg-blue-50 border border-blue-300 rounded p-4">
      <span className="text-sm">{children}</span>
    </div>
  )
}

export default InfoMessageWrapper
