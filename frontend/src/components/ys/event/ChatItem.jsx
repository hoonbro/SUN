import React, { useContext } from "react"
import { ChatContext } from "../../../pages/EventDetail"

const ChatItem = ({ chatItem, exChatItem = null }) => {
  const { id: myId } = useContext(ChatContext)["auth"]["user"]

  const isMe = myId === Number(chatItem.sender_id)
  const isContinue = exChatItem && chatItem.nickname === exChatItem.nickname

  const contentBorderColor =
    chatItem.auth === "ROLE_TEACHER"
      ? " border-orange-400 "
      : " border-blue-500 "

  const contentRoundedNone = isMe
    ? " rounded-tr-none self-end"
    : " rounded-tl-none self-start"

  return (
    <div className="flex flex-col gap-1">
      {!isContinue && (
        <div
          className={"mt-4 flex gap-2 " + (isMe ? " flex-row-reverse " : " ")}
        >
          <img
            src={
              chatItem.pic_uri ||
              require("../../../assets/images/test-profile-img.png").default
            }
            alt="사진"
            className="rounded-full w-10 h-10"
          />
          <div className={" flex flex-col " + (isMe ? " items-end " : " ")}>
            <p className="font-medium text-sm text-gray-900">
              {chatItem.nickname}{" "}
              {chatItem.auth === "ROLE_TEACHER" && <span>선생님</span>}
            </p>
            <p className="text-gray-500 text-sm">{chatItem.sentTime}</p>
          </div>
        </div>
      )}
      <span
        className={
          "border-2 rounded-xl py-1 px-2 mx-12" +
          contentBorderColor +
          contentRoundedNone
        }
      >
        {chatItem.content}
      </span>
    </div>
  )
}

export default ChatItem
