import React, { useContext, useRef } from "react"
import { IoSendSharp } from "react-icons/io5"
import { BsPaperclip, BsImageFill } from "react-icons/bs"
import { ChatContext } from "../../../pages/EventDetail"
import ChatAPI from "../../../api/chat"

const ChatController = () => {
  const { auth, missionId, client } = useContext(ChatContext)

  const send = (content) => {
    console.log(missionId)
    console.log({ content })
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
  const handleMsgSendClick = () => {
    console.log(msgEl.current.value)
    const content = msgEl.current.value
    if (content.trim()) {
      send(content)
      msgEl.current.value = ""
    }
  }

  const sendFile = async (content) => {
    console.log(missionId)
    console.log(content)

    const formData = new FormData()
    formData.append("file", content)

    await ChatAPI.sendFile(missionId, formData)
  }

  const fileEl = useRef(null)
  const handleFileBtnClick = () => fileEl.current.click()
  const handleFileChange = (e) => {
    const files = e.target.files || e.dataTransfer.files
    if (!files.length) return
    if (files[0].size > 3000000) {
      alert("파일 용량 초과")
      e.target.value = ""
      return
    }
    sendFile(files[0])
    e.target.value = ""
  }

  const imgEl = useRef(null)
  const handleImgBtnClick = () => imgEl.current.click()
  const handleImgChange = (e) => {
    const files = e.target.files || e.dataTransfer.files
    if (!files.length) return
    if (files[0].size > 3000000) {
      alert("파일 용량 초과")
      e.target.value = ""
      return
    }
    sendFile(files[0])
    e.target.value = ""
  }

  return (
    <div className="p-2 flex gap-2">
      <div className="flex flex-col justify-center gap-2">
        <button className="bg-gray-100 rounded-full w-10 h-10 flex justify-center items-center hover:bg-gray-200">
          <input
            type="file"
            ref={fileEl}
            className="hidden"
            multiple
            onChange={(e) => handleFileChange(e)}
          />
          <BsPaperclip
            onClick={() => handleFileBtnClick()}
            className="text-lg text-gray-500 "
          />
        </button>
        <button className="bg-gray-100 rounded-full w-10 h-10 flex justify-center items-center hover:bg-gray-200">
          <input
            type="file"
            ref={imgEl}
            className="hidden"
            accept="image/png, image/jpeg"
            multiple
            onChange={(e) => handleImgChange(e)}
          />
          <BsImageFill
            onClick={() => handleImgBtnClick()}
            className="text-lg text-gray-500 "
          />
        </button>
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
          onClick={() => handleMsgSendClick()}
        />
      </div>
    </div>
  )
}

export default ChatController
