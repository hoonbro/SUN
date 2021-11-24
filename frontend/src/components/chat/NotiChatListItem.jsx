import React, { useMemo } from "react"
import moment from "moment"
import "moment/locale/ko"
import gravatar from "gravatar"
import { Link } from "react-router-dom"

const NotiChatListItem = ({ ...chat }) => {
  const formattedTime = useMemo(() => {
    switch (moment(chat.sentTime).diff(moment(Date.now()), "days")) {
      case 0: {
        return moment(chat.sentTime).fromNow()
      }
      default: {
        return moment(chat.sentTime).format("YYYY. MM. DD")
      }
    }
  }, [chat.sentTime])

  const profileImage = useMemo(() => {
    return chat?.pic_uri
      ? `https://d101s.s3.ap-northeast-2.amazonaws.com/${chat.pic_uri}`
      : gravatar.url(chat?.email, { d: "retro" })
  }, [chat])

  return (
    <li>
      <Link
        className="p-2 rounded grid gap-1 hover:bg-gray-50"
        to={`/calendars/${chat.calendarId}/events/${chat.missionId}`}
      >
        <div className="flex gap-2">
          <div className="img-wrapper w-12 h-12 rounded-full overflow-hidden">
            <img
              src={profileImage}
              alt="프로필 이미지"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 grid gap-1">
            <p className="font-bold">{chat.nickname}</p>
            <p className="text-sm font-medium break-all whitespace-pre-line">
              {chat.content}
            </p>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500 ml-auto">{formattedTime}</span>
        </div>
      </Link>
    </li>
  )
}

export default NotiChatListItem
