import { Link } from "react-router-dom"

const EventListItem = ({
  title = "과제 이름",
  calendarCode = "",
  missionId = "",
  tag = [],
}) => {
  return (
    <Link
      to={`/calendars/${calendarCode}/events/${missionId}`}
      className="py-2 px-6 grid gap-2 transition-all cursor-pointer hover:bg-gray-50"
    >
      <p className="font-medium">{title}</p>
      {tag.length !== 0 && (
        <ul className="flex gap-2">
          {tag.map((value) => (
            <li className="text-xs text-gray-500" key={value}>
              {value}
            </li>
          ))}
        </ul>
      )}
    </Link>
  )
}

export default EventListItem
