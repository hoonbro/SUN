import LabelInput from "../LabelInput"

const CalendarForm = ({
  calendar,
  canSubmit = false,
  mode = "create",
  onChange = (f) => f,
  onSubmit = (f) => f,
}) => {
  return (
    <form className="grid gap-2" onSubmit={onSubmit}>
      <LabelInput
        label="캘린더 이름"
        value={calendar.value}
        name="calendar"
        placeholder="ex) teresoma"
        onChange={onChange}
      />
      <button
        className={`flex justify-self-end py-2 px-6
        ${canSubmit ? "bg-orange-400" : "bg-gray-300"}
        text-white font-bold rounded`}
        disabled={!canSubmit}
      >
        {mode === "create" ? "추가" : "수정"}
      </button>
    </form>
  )
}

export default CalendarForm
