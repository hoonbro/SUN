import { Calendar, momentLocalizer } from "react-big-calendar"
import "../static/calendar.css"
import moment from "moment"
import { useState } from "react"

const localizer = momentLocalizer(moment)

console.log(localizer)

const events = [
  {
    title: "하나",
    allDay: true,
    start: new Date(2021, 10, 0),
    end: new Date(2021, 10, 0),
  },
]

const MyCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date(2021, 9, 0))

  const handleSelectEvent = (e) => {
    console.log(e)
  }

  return (
    <div className="flex flex-col flex-1">
      <h1>Calendar</h1>
      <div>
        <button>Today</button>
        <button>Back</button>
        <button>Next</button>
      </div>
      <Calendar
        className="flex-1 mb-24"
        localizer={localizer}
        selectable={true}
        startAccessor="start"
        endAccessor="end"
        views={["month"]}
        defaultDate={new Date()}
        defaultView="month"
        events={events}
        onNavigate={(date, view, action) => {
          console.log(date)
          console.log(view)
        }}
        onSelectSlot={(e) => {
          console.log("selectSlot")
          console.log(e)
        }}
        onSelectEvent={handleSelectEvent}
      />
    </div>
  )
}

export default MyCalendar
