import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

const EventListItem = ({
  title = "과제 이름",
  calendarCode = "",
  missionId = "",
  tag = [],
  targetDate = "",
  startDate = "",
  startTime = "",
  endDate = "",
  endTime = "",
}) => {
  const [start, setStart] = useState(startTime)
  const [end, setEnd] = useState(endTime)

  useEffect(() => {
    let isStartBefore = false
    let isEndAfter = false
    if (new Date(startDate).getTime() < new Date(targetDate).getTime()) {
      setStart("오전 12:00")
      isStartBefore = true
    }
    if (new Date(targetDate).getTime() < new Date(endDate).getTime()) {
      setEnd("오전 12:00")
      isEndAfter = true
    }
    if (isStartBefore && isEndAfter) {
      setStart("종일")
      setEnd("")
    }
  }, [startDate, endDate, targetDate])

  return (
    <Link
      to={`/calendars/${calendarCode}/events/${missionId}`}
      className="py-2 px-4 flex items-center justify-between transition-all cursor-pointer hover:bg-gray-50"
    >
      <div className="flex items-stretch gap-2 h-9">
        <div className="flex flex-col gap-1 pr-2 border-r-2 border-teal-400 justify-center w-20">
          <span className="text-xs font-bold text-right">{start}</span>
          {end && <span className="text-xs text-right">{end}</span>}
        </div>
        <p className="font-medium flex items-center">{title}</p>
      </div>
      {tag.length !== 0 && (
        <ul className="flex gap-2 ml-20">
          {tag.map((value) => (
            <li className="text-xs font-medium text-gray-800" key={value}>
              # {value}
            </li>
          ))}
        </ul>
      )}
    </Link>
  )
}

export default EventListItem
