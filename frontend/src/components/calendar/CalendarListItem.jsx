import React, { useCallback, useMemo, useState } from "react"
import { Link } from "react-router-dom"
import { useAuthState } from "../../context"
import CalendarInviteModal from "./CalendarInviteModal"

const CalendarListItem = ({
  calendarCode = "",
  calendarName = "",
  myCalenar = true,
  onDelete = (f) => f,
}) => {
  const authState = useAuthState()
  const [modalOpen, setModalOpen] = useState(false)

  const isDefaultCalendar = useMemo(() => {
    return authState.user?.defaultCalendar === calendarCode
  }, [authState, calendarCode])

  const handleModalOpen = useCallback(() => {
    setModalOpen(true)
  }, [])

  const handleModalClose = useCallback(() => {
    setModalOpen(false)
  }, [])

  return (
    <>
      <div className="grid gap-2 p-2 hover:bg-gray-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <span className="font-medium">{calendarName}</span>
            {isDefaultCalendar && (
              <span className="text-sm text-gray-700">(기본 캘린더)</span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button className="flex text-sm" onClick={handleModalOpen}>
              캘린더 초대
            </button>
            {myCalenar && (
              <Link
                to={`/calendars/${calendarCode}/edit`}
                className="flex text-sm text-gray-600"
              >
                수정
              </Link>
            )}
            {!isDefaultCalendar && (
              <button
                onClick={() => onDelete(calendarCode)}
                className="flex text-sm text-red-500"
              >
                {myCalenar ? "삭제" : "연결끊기"}
              </button>
            )}
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">캘린더 코드</span>
          <span className="text-sm text-gray-600">{calendarCode}</span>
        </div>
      </div>
      {modalOpen && (
        <CalendarInviteModal
          onCloseModal={handleModalClose}
          calendarName={calendarName}
          calendarCode={calendarCode}
        />
      )}
    </>
  )
}

export default CalendarListItem
