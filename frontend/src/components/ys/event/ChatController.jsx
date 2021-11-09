import React, { useContext, useRef } from "react"
import { IoSendSharp } from "react-icons/io5"
import { BsPaperclip, BsImageFill } from "react-icons/bs"
import { ChatContext } from "../../../pages/EventDetail"

const ChatController = () => {
  const { auth, missionId, client } = useContext(ChatContext)

  const send = (content) => {
    console.log(missionId)
    console.log(content)
    if (client.current.connected) {
      client.current.publish({
        destination: `/message/mission/${missionId}`,
        headers: { Authorization: auth.token?.accessToken },
        body: content,
      })
    }
  }

  const msgEl = useRef(null)
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      const content = e.target.value
      if (content.trim()) {
        send(JSON.stringify({ content }))
        e.target.value = ""
      }
    }
  }
  const handleMsgSendClick = () => {
    console.log(msgEl.current.value)
    const content = msgEl.current.value
    if (content.trim()) {
      send(JSON.stringify({ content }))
      msgEl.current.value = ""
    }
  }

  const sendFile = (content) => {
    console.log(missionId)
    console.log(content)
    console.log(JSON.stringify(content))

    const formData = new FormData()
    formData.append("file", content)
    console.log(formData.get("file"))

    if (client.current.connected) {
      client.current.publish({
        destination: `/message/mission/${missionId}`,
        headers: { Authorization: auth.token?.accessToken },
        // body: { content: content },
        // body: { file: content },
        // body: content,
        // body: { content: formData },
        // body: { file: formData },
        // body: formData,
        // body: JSON.stringify(content),
        // body: JSON.stringify({ file: content }),
        // body: JSON.stringify({ file: formData }),
      })
    }
  }

  const fileEl = useRef(null)
  const imgEl = useRef(null)
  const handleImgBtnClick = () => imgEl.current.click()
  const handleImgChange = (e) => {
    console.log(e.target.files)
    const files = e.target.files
    if (!files.length) return
    sendFile(files[0])

    // const formData = new FormData()
    // formData.append("file", files[0])
    // console.log(formData)
    // console.log(formData.get("file"))
    // sendFile(formData)
    e.target.value = ""
  }

  return (
    <div className="p-2 flex gap-2">
      <div className="flex flex-col justify-center gap-2">
        <div className="bg-gray-100 rounded-full w-10 h-10 flex justify-center items-center">
          <input type="file" ref={fileEl} className="hidden" />
          <BsPaperclip className="text-lg text-gray-500 " />
        </div>
        <div className="bg-gray-100 rounded-full w-10 h-10 flex justify-center items-center">
          <input
            type="file"
            ref={imgEl}
            className="hidden"
            accept="image/*"
            multiple
            onChange={(e) => handleImgChange(e)}
          />
          <BsImageFill
            onClick={() => handleImgBtnClick()}
            className="text-lg text-gray-500 "
          />
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
          onClick={() => handleMsgSendClick()}
        />
      </div>
    </div>
  )
}

export default ChatController
