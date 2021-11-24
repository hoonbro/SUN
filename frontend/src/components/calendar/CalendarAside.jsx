import { Link, useParams } from "react-router-dom"
import { FcSettings } from "react-icons/fc"
import CalendarAddForm from "./CalendarAddForm"
import useSWR from "swr"
import featcher from "../../lib/featcher"
import CalendarAsideListItem from "./CalendarAsideListItem"

const CalendarAside = ({ asideOpen = false, setAsideOpen = (f) => f }) => {
  const { calendarCode } = useParams()
  const { data: calendarData } = useSWR("/calendar/every/calendars", featcher)

  return (
    <>
      {asideOpen && (
        <div
          className="absolute top-0 left-0 w-screen h-screen z-20 bg-black bg-opacity-50"
          onClick={() => setAsideOpen(false)}
        ></div>
      )}
      <aside
        className={`absolute top-0 left-0 py-6 px-4 w-80 h-screen bg-white z-20 transition-all transform ${
          asideOpen ? "translate-x-0" : "-translate-x-80"
        }`}
      >
        <section className="grid gap-6 mb-10">
          <header className="flex items-center justify-between">
            <h3>캘린더 목록</h3>
            <Link to={`/calendars/setting`}>
              <FcSettings size={24} />
            </Link>
          </header>
          {calendarData && (
            <div className="grid gap-2">
              {[...calendarData.myCalendar, ...calendarData.shareCalendar].map(
                (calendar) => (
                  <CalendarAsideListItem
                    {...calendar}
                    key={calendar.calendarCode}
                    active={calendar.calendarCode === calendarCode}
                  />
                )
              )}
            </div>
          )}
        </section>
        <hr />
        <section className="mt-6 grid gap-4">
          <h4>공유 캘린더 추가하기</h4>
          <CalendarAddForm />
        </section>
      </aside>
    </>
  )
}
export default CalendarAside
