import { Calendar, momentLocalizer } from "react-big-calendar"
// import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop"
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
import { setCurrentCalendar, useCalendarDispatch } from "../context"
import calendarAPI from "../api/calendar"
import useSWR from "swr"
import featcher from "../lib/featcher"
import notificationAPI from "../api/notification"

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
      setEvents(
        eventsRes.map((event) => {
          return {
            ...event,
            targetDate: moment(date).format("YYYY-MM-DD"),
            startDate: moment(event.start).format("YYYY-MM-DD"),
            startTime: moment(event.start).format("a HH:mm"),
            endDate: moment(event.end).format("YYYY-MM-DD"),
            endTime: moment(event.end).format("a HH:mm"),
          }
        })
      )
    }
    asyncEffect()
    return () => {
      setEvents([])
    }
  }, [calendarCode, date])

  return (
    <Modal onClose={onClose}>
      <div className="flex flex-col h-full">
        <header className="flex items-center justify-between p-4">
          <h5 className="select-none font-bold">{selectedDate}</h5>
          <button onClick={onClose}>
            <MdClose size="20" />
          </button>
        </header>
        <div className="px-6 py-2 bg-gray-100">
          <p className="font-medium select-none">과제</p>
        </div>
        <div className="overflow-auto flex-1 py-2">
          <div className="grid gap-2">
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

  const { data: calendarListData } = useSWR(
    "/calendar/every/calendars",
    featcher
  )
  const { data: calendarData } = useSWR(
    calendarCode ? `/calendar/${calendarCode}` : null,
    featcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  )

  const { data: events } = useSWR(
    calendarCode ? `/mission?calendarCode=${calendarCode}` : null,
    featcher
  )

  const [selectedDate, setSelectedDate] = useState(null)
  // const [events, setEvents] = useState([])
  const [modalOpen, setModalOpen] = useState(false)
  const [asideOpen, setAsideOpen] = useState(false)

  const handleSelectSlot = useCallback((slotInfo) => {
    setSelectedDate(slotInfo.slots[0])
    setModalOpen(true)
  }, [])

  const handleShowMore = useCallback((events, date) => {
    setSelectedDate(date)
    setModalOpen(true)
  }, [])

  const handleModalClose = useCallback(() => {
    setModalOpen(false)
  }, [])

  const handleSelectEvent = (e) => {
    console.log(e)
    history.push(`/calendars/${e.calendarCode}/events/${e.missionId}`)
  }

  // const handleEventSource = useCallback(() => {
  //   const calendarCodeList = []
  //   const id = JSON.parse(localStorage.getItem("currentUser"))?.user?.id
  //   if (id) {
  //     const eventSource = new EventSource(`/api/notification/subscribe/${id}`)
  //     eventSource.onopen = (e) => {
  //       console.log(e)
  //     }
  //     eventSource.onerror = (e) => {
  //       console.error(e)
  //       eventSource.close()
  //     }
  //     eventSource.onmessage = (e) => {
  //       console.log(e.data)
  //     }
  //   }
  //   if (calendarListData) {
  //     calendarListData.myCalendar.forEach((c) =>
  //       calendarCodeList.push(c.calendarCode)
  //     )
  //     calendarListData.shareCalendar.forEach((c) =>
  //       calendarCodeList.push(c.calendarCode)
  //     )
  //   }
  //   // calendarCodeList.forEach((calendarCode) => {
  //   //   const eventSource = new EventSource(
  //   //     `/api/notification/subscribe/calendar/${calendarCode}`
  //   //   )
  //   //   eventSource.onopen = (e) => {
  //   //     console.log(e)
  //   //   }
  //   //   eventSource.onerror = (e) => {
  //   //     console.error(e)
  //   //   }
  //   //   eventSource.onmessage = (e) => {
  //   //     console.log(e.data)
  //   //   }
  //   // })
  // }, [calendarListData])

  useEffect(() => {
    setModalOpen(false)
    setAsideOpen(false)
    setCurrentCalendar(calendarDispatch, calendarCode)
    // handleEventSource()

    const [today, back, next] = document.querySelectorAll(
      ".rbc-btn-group button"
    )
    if (today && back && next) {
      today.innerText = "오늘"
      back.innerText = "<"
      next.innerText = ">"
    }
  }, [calendarDispatch, calendarCode, calendarListData])

  return (
    <div className="relative flex flex-col h-full pb-4">
      <header className="p-4">
        <button
          className="flex items-center gap-1"
          onClick={() => setAsideOpen(!asideOpen)}
        >
          <MdSwapHoriz size={20} />
          <span className="font-bold">{calendarData?.calendarName}</span>
        </button>
      </header>
      {events !== undefined && (
        <Calendar
          className="container flex-auto"
          selectable
          localizer={localizer}
          views={["month"]}
          defaultDate={new Date()}
          defaultView="month"
          events={events || []}
          onSelectSlot={handleSelectSlot}
          onSelectEvent={handleSelectEvent}
          onShowMore={handleShowMore}
        />
      )}
      <Link
        className="flex w-14 h-14 bg-orange-400 shadow-md items-center justify-center rounded-full absolute bottom-4 right-4 text-white z-10"
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
