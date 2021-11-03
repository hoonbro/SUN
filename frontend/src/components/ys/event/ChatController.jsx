import React, { useContext, useRef } from "react"
import { IoSendSharp } from "react-icons/io5"
import { BsPaperclip, BsImageFill } from "react-icons/bs"
import { ChatContext } from "../../../pages/EventDetail"

const ChatController = () => {
  const { auth, missionId, client } = useContext(ChatContext)
  const send = (content) => {
    if (client.current.connected) {
      client.current.publish({
        destination: `/message/mission/${missionId}`,
        headers: { Authorization: auth.token?.accessToken },
        body: JSON.stringify({ content }),
      })
    }
  }

  const msgEl = useRef(null)

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      const content = e.target.value
      if (content.trim()) {
        send(content)
        e.target.value = ""
      }
    }
  }
  const handleClick = () => {
    console.log(msgEl.current.value)
    const content = msgEl.current.value
    if (content.trim()) {
      send(content)
      msgEl.current.value = ""
    }
  }
  return (
    <div className="p-2 flex gap-2">
      <div className="flex flex-col justify-center gap-2">
        <div className="bg-gray-100 rounded-full w-10 h-10 flex justify-center items-center">
          <BsPaperclip className="text-lg text-gray-500 " />
        </div>
        <div className="bg-gray-100 rounded-full w-10 h-10 flex justify-center items-center">
          <BsImageFill className="text-lg text-gray-500 " />
        </div>
      </div>
      <div className="bg-gray-100 rounded-lg flex items-center gap-2 p-2 flex-grow">
        <textarea
          ref={msgEl}
          className="flex-grow outline-none resize-none bg-gray-100 font-medium text-sm h-20"
          placeholder="메세지를 입력하세요"
          onKeyDown={handleKeyPress}
        ></textarea>
        <IoSendSharp
          className="text-gray-400 text-2xl"
          onClick={() => handleClick()}
        />
      </div>
    </div>
  )
}

export default ChatController
