import { useCallback, useMemo } from "react"
import { useHistory } from "react-router-dom"
import calendarAPI from "../api/calendar"
import CalendarForm from "../components/calendar/CalendarForm"
import Header from "../components/Header"
import { addCalendar, useCalendarDispatch } from "../context"
import useInputs from "../hooks/useInputs"

const CalendarCreate = () => {
  const history = useHistory()
  const calendarDispatch = useCalendarDispatch()
  const [fields, handleChange] = useInputs({
    calendar: {
      value: "",
      errors: {},
      validators: [],
    },
  })

  const canSubmit = useMemo(() => {
    return fields.calendar.value
  }, [fields])

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault()
      if (fields.calendar.value.length === 0) {
        alert("캘린더 이름을 입력해야 합니다")
        return
      }
      const newCalendar = await calendarAPI.createCalendar(
        fields.calendar.value
      )
      addCalendar(calendarDispatch, newCalendar)
      history.push("/calendars/setting")
    },
    [fields, history, calendarDispatch]
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
            calendar={fields.calendar}
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
