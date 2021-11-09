import React, { useState } from "react"
import { MdAttachFile, MdSaveAlt } from "react-icons/md"
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri"

const EventMaterial = () => {
  const [isShow, setIsShow] = useState(false)
  return (
    <section className="py-4 px-4 grid gap-2">
      <div className="flex justify-between items-center">
        <p className="flex items-center gap-1">
          <MdAttachFile className="text-blue-300 text-2xl" />
          <span className="text-gray-900 font-medium">강의자료</span>
        </p>
        {!isShow && (
          <RiArrowDropDownLine
            className="text-3xl"
            onClick={() => setIsShow(true)}
          />
        )}
        {isShow && (
          <RiArrowDropUpLine
            className="text-3xl"
            onClick={() => setIsShow(false)}
          />
        )}
      </div>
      {isShow && (
        <div className="border border-gray-400 rounded py-2 grid gap-2">
          <p className="flex justify-between px-4 py-2 items-center">
            <span>Spot 색칠공부하기</span>
            <MdSaveAlt className="text-2xl text-gray-500" />
          </p>
          <p className="flex justify-between px-4 py-2 items-center">
            <span>단어시험</span>
            <MdSaveAlt className="text-2xl text-gray-500" />
          </p>
        </div>
      )}
    </section>
  )
}

export default EventMaterial
