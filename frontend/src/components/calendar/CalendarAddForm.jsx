import { useCallback, useMemo, useState } from "react"
import calendarAPI from "../../api/calendar"
import { addCalendar, useCalendarDispatch } from "../../context"

const CalendarAddForm = () => {
  const calendarDispatch = useCalendarDispatch()
  const [code, setCode] = useState("")
  const [loading, setLoading] = useState(false)

  const handleChange = useCallback((e) => {
    setCode(e.target.value)
  }, [])

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault()
      if (!code) {
        alert("코드를 입력하세요")
      }
      try {
        setLoading(true)
        const calendarRes = await calendarAPI.addShareCalendar(code)
        setLoading(false)
        console.log(calendarRes)
        // addCalendar(calendarDispatch, calendarRes)
      } catch (error) {
        alert("잘못된 코드입니다")
      }
    },
    [code]
  )

  const canSubmit = useMemo(() => {
    return code && !loading
  }, [code, loading])

  return (
    <form className="grid gap-2" onSubmit={handleSubmit}>
      <div className="form-field">
        <label htmlFor="calendar_code">캘린더 코드</label>
        <div className="input-wrapper">
          <input
            type="text"
            name="code"
            id="calendar_code"
            value={code}
            onChange={handleChange}
          />
        </div>
      </div>
      <button
        className={`justify-self-end py-2 px-6 text-sm text-white rounded
        ${canSubmit ? "bg-orange-500" : "bg-gray-400"}`}
        disabled={!canSubmit}
      >
        추가
      </button>
    </form>
  )
}

export default CalendarAddForm
