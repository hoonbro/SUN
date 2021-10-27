import React from "react"
import { IoSendSharp } from "react-icons/io5"
import { BsPaperclip, BsImageFill } from "react-icons/bs"
const ChatController = () => {
  return (
    <div className="flex p-2 gap-2">
      <div className="flex flex-col gap-2 items-center ">
        <div className="bg-gray-100 rounded-full w-10 h-10 flex justify-center items-center">
          <BsPaperclip className="text-lg text-gray-500" />
        </div>
        <div className="bg-gray-100 rounded-full w-10 h-10 flex justify-center items-center">
          <BsImageFill className="text-lg text-gray-500" />
        </div>
      </div>
      <div className="bg-gray-100 rounded-lg flex items-center gap-2 p-2 flex-grow">
        <textarea
          className="flex-grow outline-none resize-none bg-gray-100 font-medium text-sm"
          placeholder="메세지를 입력하세요"
        ></textarea>
        <IoSendSharp className="text-gray-400 text-2xl" />
      </div>
    </div>
  )
}

export default ChatController
