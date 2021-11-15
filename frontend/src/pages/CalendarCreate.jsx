import { useCallback, useMemo, useState } from "react"
import { useHistory } from "react-router-dom"
import calendarAPI from "../api/calendar"
import CalendarForm from "../components/calendar/CalendarForm"
import Header from "../components/Header"

const CalendarCreate = () => {
  const history = useHistory()
  const [calendarName, setCalendarName] = useState("")

  const canSubmit = useMemo(() => {
    return calendarName
  }, [calendarName])

  const handleChange = useCallback((e) => {
    setCalendarName(e.target.value)
  }, [])

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault()
      if (calendarName.length === 0) {
        alert("캘린더 이름을 입력해야 합니다")
        return
      }
      await calendarAPI.createCalendar(calendarName)
      history.push("/calendars/setting")
    },
    [calendarName, history]
  )

  return (
    <div className="min-h-full bg-gray-50 flex flex-col">
      <Header
        pageTitle="캘린더 추가"
        backPageTitle="캘린더 관리"
        to="/calendars/setting"
      />
      <div className="py-10 h-full flex-1">
        <div className="container max-w-lg bg-white p-6 xs:rounded-xl xs:shadow-lg">
          <CalendarForm
            value={calendarName}
            canSubmit={canSubmit}
            onChange={handleChange}
            onSubmit={handleSubmit}
          />
        </div>
      </div>
    </div>
  )
}

export default CalendarCreate
