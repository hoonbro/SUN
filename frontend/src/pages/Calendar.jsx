import { Calendar, momentLocalizer } from "react-big-calendar"
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop"
import moment from "moment"
import "moment/locale/ko"
import { useCallback, useEffect, useMemo, useState } from "react"
import { Link, useParams, useHistory } from "react-router-dom"
import { MdClose, MdSwapHoriz, MdAdd } from "react-icons/md"
import Modal from "../components/modal/Modal"
import EventListItem from "../components/EventListItem"

import "../static/calendar.css"
import "react-big-calendar/lib/addons/dragAndDrop/styles.scss"
import CalendarAside from "../components/calendar/CalendarAside"
import client from "../api/client"
import {
  getAllCalendar,
  setCurrentCalendar,
  useCalendarDispatch,
} from "../context"
import calendarAPI from "../api/calendar"

const DragAndDropCalendar = withDragAndDrop(Calendar)
const localizer = momentLocalizer(moment)

const EventsModal = ({
  date = new Date(),
  onClose = (f) => f,
  calendarCode = "",
}) => {
  const [events, setEvents] = useState([])

  const selectedDate = useMemo(
    () => moment(date).format("YYYY년 MM월 DD일 dddd"),
    [date]
  )

  useEffect(() => {
    async function asyncEffect() {
      const eventsRes = await calendarAPI.getMissionList({
        missionDate: moment(date).format("YYYY-MM-DD"),
        calendarCode,
      })
      setEvents(eventsRes)
    }
    asyncEffect()
    return () => {
      setEvents([])
    }
  }, [calendarCode, date])

  return (
    <Modal onClose={onClose}>
      <div className="flex flex-col h-full">
        <header className="flex items-center justify-between p-6">
          <h4 className="select-none">{selectedDate}</h4>
          <button onClick={onClose}>
            <MdClose size="20" />
          </button>
        </header>
        <div className="px-6 py-2 bg-orange-50">
          <p className="font-medium select-none">과제</p>
        </div>
        <div className="overflow-auto flex-1 py-4">
          <div className="grid">
            {events.map((event) => (
              <EventListItem key={event.missionId} {...event} />
            ))}
          </div>
        </div>
        <div
          className="relative bg-gray-100 flex items-center justify-center overflow-hidden"
          style={{ paddingTop: "30%" }}
        >
          <img
            className="absolute filter blur-sm inset-0 object-cover"
            style={{ width: "120%", height: "120%" }}
            src="https://img.kr.news.samsung.com/kr/wp-content/uploads/2021/05/%EC%82%BC%EC%84%B1-%EC%B2%AD%EB%85%84-%EC%86%8C%ED%94%84%ED%8A%B8%EC%9B%A8%EC%96%B4-%EC%95%84%EC%B9%B4%EB%8D%B0%EB%AF%B8-1-210512.jpg"
            alt=""
          />
          <img
            className="absolute inset-0 w-full h-full object-contain"
            src="https://img.kr.news.samsung.com/kr/wp-content/uploads/2021/05/%EC%82%BC%EC%84%B1-%EC%B2%AD%EB%85%84-%EC%86%8C%ED%94%84%ED%8A%B8%EC%9B%A8%EC%96%B4-%EC%95%84%EC%B9%B4%EB%8D%B0%EB%AF%B8-1-210512.jpg"
            alt=""
          />
        </div>
      </div>
    </Modal>
  )
}

const MyCalendar = () => {
  const history = useHistory()
  const calendarDispatch = useCalendarDispatch()
  const { calendarCode } = useParams()
  const [selectedDate, setSelectedDate] = useState(null)
  const [events, setEvents] = useState([])
  const [modalOpen, setModalOpen] = useState(false)
  const [asideOpen, setAsideOpen] = useState(false)
  const [calendarInfo, setCalendarInfo] = useState({
    calendarCode: "",
    calendarName: "",
    id: -1,
  })

  const handleSelectSlot = useCallback((slotInfo) => {
    setSelectedDate(slotInfo.slots[0])
    setModalOpen(true)
  }, [])

  const handleModalClose = useCallback(() => {
    setModalOpen(false)
  }, [])

  const handleDropEvent = useCallback(({ event, start, end }) => {
    setEvents((prevEvents) =>
      prevEvents.map((existingEvent) => {
        return event.id === existingEvent.id
          ? { ...existingEvent, start, end }
          : existingEvent
      })
    )
  }, [])

  const handleResizeEvent = useCallback(({ event, start, end }) => {
    if (start >= end) {
      alert("종료 날짜는 시작날짜보다 늦어야 합니다")
      return
    }
    setEvents((prevEvents) =>
      prevEvents.map((existingEvent) => {
        return event.id === existingEvent.id
          ? { ...existingEvent, start, end }
          : existingEvent
      })
    )
  }, [])

  const handleSelectEvent = (e) => {
    console.log(e)
    history.push(`/calendars/${e.calendarCode}/events/${e.missionId}`)
  }

  const getCalendarInfo = useCallback(async () => {
    try {
      const res = await client.get(`calendar/${calendarCode}`)
      setCalendarInfo({ ...res.data })
    } catch (error) {
      console.log(error)
    }
  }, [calendarCode])

  const getEvents = useCallback(async () => {
    try {
      const res = await calendarAPI.getMissionList({ calendarCode })
      setEvents([...res])
    } catch (error) {
      console.log(error)
    }
  }, [calendarCode])

  useEffect(() => {
    async function asyncEffect() {
      await getCalendarInfo()
      await getEvents()
      await getAllCalendar(calendarDispatch)
    }
    setModalOpen(false)
    setAsideOpen(false)
    asyncEffect()
    setCurrentCalendar(calendarDispatch, calendarCode)
  }, [getCalendarInfo, getEvents, calendarDispatch, calendarCode])

  return (
    <div className="relative flex flex-col h-full pb-10">
      <header className="p-4">
        <button
          className="flex items-center gap-1"
          onClick={() => setAsideOpen(!asideOpen)}
        >
          <MdSwapHoriz size={20} />
          <span className="font-bold">{calendarInfo.calendarName}</span>
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
        onSelectEvent={handleSelectEvent}
      />
      <Link
        className="flex w-14 h-14 bg-orange-400 shadow-md items-center justify-center rounded-full absolute bottom-4 right-4 text-white"
        to={`/calendars/${calendarCode}/events/create`}
      >
        <MdAdd size={28} />
      </Link>
      {modalOpen && (
        <EventsModal
          date={selectedDate}
          onClose={handleModalClose}
          calendarCode={calendarCode}
        />
      )}
      <CalendarAside asideOpen={asideOpen} setAsideOpen={setAsideOpen} />
    </div>
  )
}

export default MyCalendar
