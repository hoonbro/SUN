import { useCallback, useEffect, useMemo, useState } from "react"
import { useHistory, useParams } from "react-router-dom"
import calendarAPI from "../api/calendar"
import CalendarForm from "../components/calendar/CalendarForm"
import Header from "../components/Header"

const CalendarEdit = () => {
  const history = useHistory()
  const { calendarCode } = useParams()
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
      await calendarAPI.editCalendar({
        calendarCode,
        calendarName,
      })
      history.push("/calendars/setting")
    },
    [calendarName, history, calendarCode]
  )

  useEffect(() => {
    async function asyncEffect() {
      const calendarRes = await calendarAPI.getCalendar(calendarCode)
      setCalendarName(calendarRes.calendarName)
    }
    asyncEffect()
  }, [calendarCode])

  return (
    <div className="min-h-full bg-gray-50 flex flex-col">
      <Header
        pageTitle="캘린더 수정"
        backPageTitle="캘린더 관리"
        to="/calendars/setting"
      />
      <div className="py-10 h-full flex-1">
        <div className="container max-w-lg bg-white p-6 xs:rounded-xl xs:shadow-lg">
          <CalendarForm
            mode="edit"
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

export default CalendarEdit
