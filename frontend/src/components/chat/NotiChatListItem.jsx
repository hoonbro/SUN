import React, { useCallback, useEffect, useMemo, useRef, useState } from "react"
import moment from "moment"
import "moment/locale/ko"
import gravatar from "gravatar"
import { IoEllipsisVertical } from "react-icons/io5"
import { Link } from "react-router-dom"

const NotiChatListItem = ({ ...chat }) => {
  const [menuOpen, setMenuOpen] = useState(false)
  const deleteBtnEl = useRef()

  const handleMenuToggle = useCallback(() => {
    setMenuOpen((prevState) => !prevState)
  }, [])

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

  useEffect(() => {
    if (menuOpen === true) {
      deleteBtnEl.current.focus()
    }
  }, [deleteBtnEl, menuOpen])

  return (
    <li>
      <Link
        className="p-2 rounded grid gap-1 hover:bg-gray-50"
        to={`/calendars/${chat.chatRoom.mission.calendarCode}/events/${chat.chatRoom.mission.missionId}`}
      >
        <div className="flex gap-2">
          <div className="flex-1 grid gap-1">
            <p className="font-bold">{chat.sender}</p>
            <p className="text-sm font-medium">{chat.content}</p>
          </div>
          <div className="relative">
            <button className="flex" onClick={handleMenuToggle}>
              <IoEllipsisVertical size={18} />
            </button>
            {menuOpen && (
              <div className="absolute bottom-0 right-0 bg-white w-12 shadow-lg rounded">
                <button
                  className="text-sm font-medium text-red-500 py-1 px-2 w-full"
                  onBlur={handleMenuToggle}
                  ref={deleteBtnEl}
                >
                  삭제
                </button>
              </div>
            )}
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
