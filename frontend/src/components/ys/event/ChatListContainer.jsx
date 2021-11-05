import React, { useContext, useEffect, useRef } from "react"
import ChatItem from "./ChatItem"
import { ChatContext } from "../../../pages/EventDetail"

const ChatListContainer = () => {
  const { chatHistory, newChatList } = useContext(ChatContext)
  const chatListEl = useRef(null)

  useEffect(() => {
    chatListEl.current.scrollIntoView({
      behavior: "auto", // "smooth", "auto"(default)
      block: "end", // "start", "center", "end", "nearest"(default)
      inline: "nearest", // "start", "center", "end", "nearest"(default)
    })
  })

  console.log(chatHistory)
  console.log(newChatList)

  return (
    <div className="overflow-y-scroll flex-1">
      <section className="pb-4 px-4 flex flex-col gap-1" ref={chatListEl}>
        {chatHistory.map((item) => (
          <ChatItem chatItem={item} key={item.sentTime} />
        ))}
      </section>
    </div>
  )
}

export default ChatListContainer
