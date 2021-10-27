import React from "react"

const ChatItem = ({ chatItem, exChatItem = null }) => {
  const myName = "홍길동"
  const isMe = myName === chatItem.name

  const isContinue = exChatItem && chatItem.name === exChatItem.name

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
            src={chatItem.picture.default}
            alt="사진"
            className="rounded-full w-10 h-10"
          />
          <div className={" flex flex-col " + (isMe ? " items-end " : " ")}>
            <p className="font-medium text-sm text-gray-900">
              {chatItem.name}{" "}
              {chatItem.auth === "ROLE_TEACHER" && <span>선생님</span>}
            </p>
            <p className="text-gray-500 text-sm">어제, 오후 06:01</p>
          </div>
        </div>
      )}
      <span
        className={
          "border rounded-xl p-2 mx-12" +
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
