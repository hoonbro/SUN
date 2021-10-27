import React from "react"
import { IoSendSharp } from "react-icons/io5"
import { BsPaperclip, BsImageFill } from "react-icons/bs"
const ChatController = () => {
  return (
    <>
      <div>
        <BsPaperclip />
        <BsImageFill />
      </div>
      <div className="bg-gray-100 rounded-lg flex items-center gap-2 p-2">
        <textarea
          className="flex-grow outline-none resize-none bg-gray-100 font-medium text-sm"
          placeholder="메세지를 입력하세요"
        ></textarea>
        <IoSendSharp className="text-gray-400 text-2xl" />
      </div>
    </>
  )
}

export default ChatController
