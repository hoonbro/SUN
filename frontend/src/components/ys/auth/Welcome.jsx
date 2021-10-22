import React from "react"

const Welcome = () => {
  return (
    <div className="grid justify-center gap-4">
      {/* orange가 없어요 */}
      <h1 className="text-5xl text-yellow-400 text-center">Tingle</h1>
      <span className="text-gray-700 font-bold text-lg text-center">
        우리 아이 학습 관리
      </span>
    </div>
  )
}

export default Welcome
