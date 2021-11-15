import { useCallback, useState } from "react"

const CalendarInviteForm = ({ onSubmit = (f) => f }) => {
  const [email, setEmail] = useState("")

  const handleChange = useCallback((e) => {
    setEmail(e.target.value)
  }, [])

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault()
      if (!email) {
        alert("이메일을 입력하세요")
        return
      }
      onSubmit(email)
    },
    [email, onSubmit]
  )

  return (
    <form className="grid gap-2" onSubmit={handleSubmit}>
      <div className="form-field">
        <label htmlFor="calendar_code">캘린더 초대</label>
        <div className="input-wrapper">
          <input
            type="email"
            name="code"
            id="calendar_code"
            value={email}
            placeholder="초대할 이메일을 입력하세요"
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="justify-self-end flex gap-2">
        <button
          className={`py-2 px-6 text-sm text-white rounded bg-orange-500`}
        >
          초대
        </button>
      </div>
    </form>
  )
}

export default CalendarInviteForm
