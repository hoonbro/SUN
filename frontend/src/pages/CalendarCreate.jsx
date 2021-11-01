import { useCallback, useMemo } from "react"
import { useHistory } from "react-router-dom"
import CalendarForm from "../components/calendar/CalendarForm"
import Header from "../components/Header"
import useInputs from "../hooks/useInputs"

const CalendarCreate = () => {
  const history = useHistory()
  console.log(history)
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
    (e) => {
      e.preventDefault()
      console.log(fields.calendar.value)
      history.push("/calendars/setting")
    },
    [fields, history]
  )

  return (
    <div className="min-h-full bg-gray-50">
      <Header
        pageTitle="캘린더 추가"
        backPageTitle="캘린더 관리"
        to="/calendars/setting"
      />
      <div className="container max-w-lg bg-white p-6 xs:rounded-xl xs:shadow-lg">
        <CalendarForm
          calendar={fields.calendar}
          canSubmit={canSubmit}
          onChange={handleChange}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  )
}

export default CalendarCreate
