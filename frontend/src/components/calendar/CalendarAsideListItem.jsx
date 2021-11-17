import React, { useCallback, useState } from "react"
import { MdExpandLess, MdExpandMore } from "react-icons/md"
import { Link } from "react-router-dom"

const CalendarAsideListItem = ({
  calendarName = "캘린더 이름",
  calendarCode = "캘린더 코드",
  active = false,
}) => {
  const [codeOpen, setCodeOpen] = useState(false)

  const handleToggleCodeOpen = useCallback((e) => {
    e.preventDefault()
    setCodeOpen((prevState) => !prevState)
  }, [])

  return (
    <Link
      to={`/calendars/${calendarCode}`}
      className={`grid gap-1 py-2 overflow-hidden transition-all
      ${codeOpen ? "h-16" : "h-10"}`}
    >
      <div className="flex items-center justify-between">
        <button className={`${active && "font-bold text-orange-500"}`}>
          {calendarName}
        </button>
        <button className="flex" onClick={handleToggleCodeOpen}>
          {codeOpen ? <MdExpandLess size={20} /> : <MdExpandMore size={20} />}
        </button>
      </div>
      <div className="flex items-center justify-between text-sm ">
        <span>캘린더코드</span>
        <span className="text-gray-600">{calendarCode}</span>
      </div>
    </Link>
  )
}

export default CalendarAsideListItem
