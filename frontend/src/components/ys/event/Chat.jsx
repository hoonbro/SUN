import React, { useState } from "react"
import ChatItem from "./ChatItem"

const Chat = () => {
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
  return (
    <div>
      <section className="pt-6 grid gap-6">
        <ChatItem chatItem={chatItem} />
        <ChatItem chatItem={chatItem2} />
      </section>
    </div>
  )
}

export default Chat
