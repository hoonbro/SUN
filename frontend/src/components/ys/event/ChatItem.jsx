import React, { useContext, useLayoutEffect, useState } from "react"
import { ChatContext } from "../../../pages/EventDetail"
import moment from "moment"
import { BsFileText } from "react-icons/bs"

const ChatItem = ({ chatItem, exChatItem = null }) => {
  const { id: myId } = useContext(ChatContext)["auth"]["user"]
  const isMe = chatItem && myId === Number(chatItem.sender_id)

  const timeMoment = moment(chatItem.sentTime)
  const exTimeMoment = exChatItem && moment(exChatItem.sentTime)

  // 년 월 일 시 분 까지 같은지 + sender가 같은지
  const isContinue =
    exChatItem &&
    exTimeMoment.isSame(timeMoment, "d") &&
    exTimeMoment.hour() === timeMoment.hour() &&
    exTimeMoment.minute() === timeMoment.minute() &&
    chatItem.nickname === exChatItem.nickname

  const contentBorderColor =
    chatItem.auth === "ROLE_TEACHER"
      ? " border-orange-400 "
      : " border-blue-500 "

  const contentLeftRight = isMe
    ? " rounded-tr-none self-end"
    : " rounded-tl-none self-start"

  const [sentTime, setSentTime] = useState(null)

  useLayoutEffect(() => {
    if (moment().isSame(timeMoment, "d")) {
      setSentTime(timeMoment.format("LT"))
    } else {
      setSentTime(timeMoment.format("LLL"))
    }
  })

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
            <p className="text-gray-500 text-sm">{sentTime}</p>
          </div>
        </div>
      )}
      <span
        className={
          (isMe ? "mr-12 ml-24" : "ml-12 mr-24") +
          " border-2 rounded-xl py-1 px-2 " +
          contentBorderColor +
          contentLeftRight
        }
      >
        {/* svg 파일 안보임 */}
        {chatItem.fileName && chatItem.fileType.includes("image") && (
          <a href={chatItem.fileUri}>
            <img src={chatItem.fileUri} className="w-28 h-28" />
          </a>
        )}
        {chatItem.fileName && !chatItem.fileType.includes("image") && (
          <a
            href={chatItem.fileUri}
            className=" break-all flex items-center gap-2"
          >
            <p
              className={
                (chatItem.auth === "ROLE_TEACHER"
                  ? "bg-orange-200"
                  : "bg-blue-200") + " p-2 rounded-full"
              }
            >
              <BsFileText className="text-2xl" />
            </p>
            {chatItem.fileName}
          </a>
        )}
        {!chatItem.fileName && chatItem.content}
      </span>
    </div>
  )
}

export default ChatItem
