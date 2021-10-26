import { Calendar, momentLocalizer } from "react-big-calendar"
import moment from "moment"
import "moment/locale/ko"
import { useMemo, useState } from "react"
import { MdClose } from "react-icons/md"
import "../static/calendar.css"
import Modal from "../components/modal/Modal"
import EventListItem from "../components/EventListItem"

const localizer = momentLocalizer(moment)

const DUMMY_EVENTS = [
  {
    title: "하나",
    allDay: true,
    start: new Date(2021, 9, 6),
    end: new Date(2021, 9, 10),
    id: "10",
  },
]

const EventsModal = ({ date = new Date(), onClose = (f) => f }) => {
  const events = [
    {
      id: 1,
      title: "Mom Loves Spot 읽기",
      tags: ["Reading", "Listening"],
    },
    {
      id: 2,
      title: "Little Bear 흘려듣기",
      tags: ["Reading", "Listening"],
    },
    {
      id: 3,
      title: "Mom Loves Spot 읽기",
      tags: ["Reading", "Listening"],
    },
    {
      id: 4,
      title: "Little Bear 흘려듣기",
      tags: ["Reading", "Listening"],
    },
    {
      id: 5,
      title: "Mom Loves Spot 읽기",
      tags: ["Reading", "Listening"],
    },
    {
      id: 6,
      title: "Little Bear 흘려듣기",
      tags: ["Reading", "Listening"],
    },
    {
      id: 7,
      title: "Mom Loves Spot 읽기",
      tags: ["Reading", "Listening"],
    },
    {
      id: 8,
      title: "Little Bear 흘려듣기",
      tags: ["Reading", "Listening"],
    },
  ]

  const selectedDate = useMemo(
    () => moment(date).format("YYYY년 MM월 DD일 dddd"),
    [date]
  )

  return (
    <Modal onClose={onClose}>
      <div className="flex flex-col h-full">
        <header className="flex items-center justify-between py-4 px-4">
          <h4>{selectedDate}</h4>
          <button onClick={onClose}>
            <MdClose size="18" />
          </button>
        </header>
        <div className="px-6 py-2 bg-orange-200">과제</div>
        <div className="overflow-auto flex-1 py-2">
          <div className="grid">
            {events.map((event) => (
              <EventListItem key={event.id} {...event} />
            ))}
          </div>
        </div>
        <div className="bg-purple-100" style={{ height: "20vh" }}>
          SSAFY 광고
        </div>
      </div>
    </Modal>
  )
}

const MyCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(null)
  const [events, setEvents] = useState(DUMMY_EVENTS)
  const [modalOpen, setModalOpen] = useState(false)

  const handleSelectSlot = (slotInfo) => {
    setSelectedDate(slotInfo.slots[0])
    console.log(slotInfo)
    setModalOpen(true)
  }

  const handleModalClose = () => {
    setModalOpen(false)
  }

  return (
    <>
      <div className="container flex flex-col flex-1">
        <h1>Calendar</h1>
        <Calendar
          selectable
          className="flex-1 mb-24"
          localizer={localizer}
          startAccessor="start"
          endAccessor="end"
          views={["month"]}
          defaultDate={new Date()}
          defaultView="month"
          events={events}
          onSelectSlot={handleSelectSlot}
          onSelectEvent={(e) => console.log(e)}
        />
      </div>
      {modalOpen && (
        <EventsModal date={selectedDate} onClose={handleModalClose} />
      )}
    </>
  )
}

export default MyCalendar
