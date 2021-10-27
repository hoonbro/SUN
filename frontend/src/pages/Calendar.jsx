import { Calendar, momentLocalizer } from "react-big-calendar"
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop"
import moment from "moment"
import "moment/locale/ko"
import { useMemo, useState } from "react"
import { MdClose, MdSwapHoriz } from "react-icons/md"
import Modal from "../components/modal/Modal"
import EventListItem from "../components/EventListItem"

import "../static/calendar.css"
import "react-big-calendar/lib/addons/dragAndDrop/styles.scss"
import CalendarAside from "../components/calendar/CalendarAside"

const DragAndDropCalendar = withDragAndDrop(Calendar)
const localizer = momentLocalizer(moment)

const DUMMY_EVENTS = [
  {
    title: "하나",
    allDay: false,
    start: new Date(2021, 9, 6, 10, 0),
    end: new Date(2021, 9, 9, 10, 0),
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
            <MdClose size="20" />
          </button>
        </header>
        <div className="px-6 py-2 bg-orange-200">
          <p className="font-medium">과제</p>
        </div>
        <div className="overflow-auto flex-1 py-2">
          <div className="grid">
            {events.map((event) => (
              <EventListItem key={event.id} {...event} />
            ))}
          </div>
        </div>
        <div
          className="bg-purple-100 flex items-center justify-center relative"
          style={{ paddingTop: "50%" }}
        >
          <img
            className="absolute inset-0 w-full h-full object-cover object-top"
            src="https://edu.ssafy.com/data/upload_files/namo/images/000032/20211013100610824_BCUVZUPR.png"
            alt=""
          />
        </div>
      </div>
    </Modal>
  )
}

const MyCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(null)
  const [events, setEvents] = useState(DUMMY_EVENTS)
  const [modalOpen, setModalOpen] = useState(false)
  const [asideOpen, setAsideOpen] = useState(false)

  const handleSelectSlot = (slotInfo) => {
    setSelectedDate(slotInfo.slots[0])
    console.log(slotInfo)
    setModalOpen(true)
  }

  const handleModalClose = () => {
    setModalOpen(false)
  }

  const handleDropEvent = ({ event, start, end }) => {
    setEvents(
      events.map((existingEvent) => {
        return event.id === existingEvent.id
          ? { ...existingEvent, start, end }
          : existingEvent
      })
    )
  }

  const handleResizeEvent = ({ event, start, end }) => {
    if (start >= end) {
      alert("종료 날짜는 시작날짜보다 늦어야 합니다")
      return
    }
    setEvents(
      events.map((existingEvent) => {
        return event.id === existingEvent.id
          ? { ...existingEvent, start, end }
          : existingEvent
      })
    )
  }

  return (
    <div className="flex flex-col h-full relative">
      <header className="p-4">
        <button
          className="flex items-center gap-1"
          onClick={() => setAsideOpen(!asideOpen)}
        >
          <MdSwapHoriz size={20} />
          <span className="font-bold">000의 캘린더</span>
        </button>
      </header>
      <DragAndDropCalendar
        className="container flex-auto"
        selectable
        localizer={localizer}
        views={["month"]}
        defaultDate={new Date()}
        defaultView="month"
        events={events}
        onEventDrop={handleDropEvent}
        onEventResize={handleResizeEvent}
        onSelectSlot={handleSelectSlot}
        onSelectEvent={(e) => console.log(e)}
      />
      {modalOpen && (
        <EventsModal date={selectedDate} onClose={handleModalClose} />
      )}
      <CalendarAside asideOpen={asideOpen} setAsideOpen={setAsideOpen} />
    </div>
  )
}

export default MyCalendar
