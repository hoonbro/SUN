import { useState } from "react"

const CalendarAddForm = () => {
  const [code, setCode] = useState("")

  const handleChange = (e) => {
    setCode(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!code) return
    alert(code)
  }

  return (
    <form className="grid gap-2" onSubmit={handleSubmit}>
      <div className="label_input">
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
      <button className="justify-self-end py-2 px-6 text-sm text-white bg-gray-400 rounded">
        추가
      </button>
    </form>
  )
}

export default CalendarAddForm
