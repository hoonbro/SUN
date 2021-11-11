import React, { useMemo } from "react"
import { Link } from "react-router-dom"
import { useAuthState } from "../../context"

const CalendarListItem = ({
  calendarCode = "",
  calendarName = "",
  myCalenar = true,
  onDelete = (f) => f,
}) => {
  const authState = useAuthState()

  const isDefaultCalendar = useMemo(() => {
    return authState.user?.defaultCalendar === calendarCode
  }, [authState, calendarCode])

  return (
    <div className="grid gap-2 p-2 hover:bg-gray-50">
      <div className="flex items-center justify-between">
        <span className="font-medium">{calendarName}</span>
        <div className="flex items-center gap-2">
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
  )
}

export default CalendarListItem
