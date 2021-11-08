import { useCallback, useEffect, useMemo } from "react"
import { useHistory, useParams } from "react-router-dom"
import calendarAPI from "../api/calendar"
import CalendarForm from "../components/calendar/CalendarForm"
import Header from "../components/Header"
import { editCalendar, useCalendarDispatch } from "../context"
import useInputs from "../hooks/useInputs"

const CalendarEdit = () => {
  const history = useHistory()
  const { calendarCode } = useParams()
  const calendarDispatch = useCalendarDispatch()
  console.log(calendarCode)
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
      console.log(fields.calendar.value)
      const calendarRes = await calendarAPI.editCalendar({
        calendarCode,
        calendarName: fields.calendar.value,
      })
      console.log(calendarRes)
      editCalendar(calendarDispatch, calendarRes)
      history.push("/calendars/setting")
    },
    [fields, history, calendarCode, calendarDispatch]
  )

  useEffect(() => {
    async function asyncEffect() {
      const calendarRes = await calendarAPI.getCalendar(calendarCode)
      const e = {
        target: {
          name: "calendar",
          value: calendarRes.calendarName,
        },
      }
      handleChange(e)
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

export default CalendarEdit
