import React, { useContext, useLayoutEffect, useRef, useState } from "react"
import ChatItem from "./ChatItem"
import { ChatContext } from "../../../pages/EventDetail"

const ChatListContainer = () => {
  const {
    chatList,
    roomId,
    chatStatus,
    getHistory,
    currentPage,
    lastPage,
    sizePerPage,
  } = useContext(ChatContext)

  const scrollBarEl = useRef(null)
  const chatListEl = useRef(null)

  const [oldScrollHeight, setOldScrollHeight] = useState()

  useLayoutEffect(() => {
    // 최초 history
    if (sizePerPage === chatList.length)
      chatListEl.current.scrollIntoView(false)
    // 새로운 메세지 왔을 때
    else if (chatStatus === "new_message")
      chatListEl.current.scrollIntoView(false)
    // 2번째 이상 history 가져왔을 때
    else if (chatStatus === "history") {
      scrollBarEl.current.scrollTop =
        scrollBarEl.current.scrollHeight - oldScrollHeight
    }
  }, [chatList])

  const handleScroll = (e) => {
    if (e.target.scrollTop === 0 && currentPage <= lastPage) {
      setOldScrollHeight(e.target.scrollHeight)
      getHistory(roomId)
    }
  }

  return (
    <div
      className="overflow-y-scroll flex-1"
      onScroll={handleScroll}
      ref={scrollBarEl}
    >
      <section className="pb-4 px-4 flex flex-col gap-1" ref={chatListEl}>
        {chatList.map((item, index) => (
          <ChatItem
            chatItem={item}
            key={index}
            exChatItem={index ? chatList[index - 1] : null}
          />
        ))}
      </section>
    </div>
  )
}

export default ChatListContainer
