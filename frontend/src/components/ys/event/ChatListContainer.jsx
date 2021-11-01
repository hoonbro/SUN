import React, { useEffect, useRef } from "react"
import ChatItem from "./ChatItem"

const ChatListContainer = () => {
  const chatList = useRef(null)

  useEffect(() => {
    console.log(
      chatList.current.scrollIntoView({
        behavior: "auto", // "smooth", "auto"(default)
        block: "end", // "start", "center", "end", "nearest"(default)
        inline: "nearest", // "start", "center", "end", "nearest"(default)
      })
    )
  })

  const chatItem = {
    picture: require("../../../assets/images/test-profile-img.png"),
    name: "김병훈",
    auth: "ROLE_TEACHER",
    date: new Date(),
    content: "과제 등록했어요",
  }
  const chatItem2 = {
    picture: require("../../../assets/images/test-profile-img.png"),
    name: "남아리",
    auth: "ROLE_STUDENT",
    date: new Date(),
    content: "안녕하세요, 선생님!",
  }
  const chatItem3 = {
    picture: require("../../../assets/images/test-profile-img.png"),
    name: "남아리",
    auth: "ROLE_STUDENT",
    date: new Date(),
    content: "잘부탁해요!",
  }
  const chatItem4 = {
    picture: require("../../../assets/images/test-profile-img.png"),
    name: "홍길동",
    auth: "ROLE_STUDENT",
    date: new Date(),
    content: "안녕하세요, 선생님!",
  }
  const chatItem5 = {
    picture: require("../../../assets/images/test-profile-img.png"),
    name: "홍길동",
    auth: "ROLE_STUDENT",
    date: new Date(),
    content: "저는 홍길동입니다 잘부탁해요",
  }
  const chatItem6 = {
    picture: require("../../../assets/images/test-profile-img.png"),
    name: "김병훈",
    auth: "ROLE_TEACHER",
    date: new Date(),
    content: "반가워요 남아리 학생",
  }
  const chatItem7 = {
    picture: require("../../../assets/images/test-profile-img.png"),
    name: "김병훈",
    auth: "ROLE_TEACHER",
    date: new Date(),
    content: "반가워요 홍길동 학생",
  }
  return (
    <div className="overflow-y-scroll flex-1">
      <section className="pb-4 px-4 flex flex-col gap-1" ref={chatList}>
        <ChatItem chatItem={chatItem} />
        <ChatItem chatItem={chatItem2} exChatItem={chatItem} />
        <ChatItem chatItem={chatItem3} exChatItem={chatItem2} />
        <ChatItem chatItem={chatItem4} exChatItem={chatItem3} />
        <ChatItem chatItem={chatItem5} exChatItem={chatItem4} />
        <ChatItem chatItem={chatItem6} exChatItem={chatItem5} />
        <ChatItem chatItem={chatItem7} exChatItem={chatItem6} />
      </section>
    </div>
  )
}

export default ChatListContainer
