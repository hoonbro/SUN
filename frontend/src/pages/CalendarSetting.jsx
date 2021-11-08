import Header from "../components/Header"
import Divider from "../components/Divider"
import { Link } from "react-router-dom"
import CalendarAddForm from "../components/calendar/CalendarAddForm"
import { useCalendarState } from "../context"
import InfoMessageWrapper from "../components/InfoMessageWrapper"

const CalendarSetting = () => {
  const calendarState = useCalendarState()
  return (
    <div className="bg-gray-50 min-h-full">
      <Header
        pageTitle="캘린더 관리"
        to={`/calendars/${calendarState.currentCalendarCode}`}
      />
      <div className="py-10">
        <div className="container max-w-3xl p-6 bg-white grid gap-6 xs:gap-10 xs:shadow-lg xs:rounded-xl">
          <section className="grid gap-6">
            <header className="flex items-center justify-between">
              <h3>내 캘린더</h3>
              <Link to={`/calendars/create`} className="flex">
                <span className="text-sm text-orange-400 font-medium">
                  캘린더 추가
                </span>
              </Link>
            </header>
            <div className="grid gap-6">
              {calendarState.myCalendar.map((c) => (
                <div className="grid gap-2" key={c.calendarCode}>
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{c.calendarName}</span>
                    <Link
                      to={`/calendars/${c.calendarCode}/edit`}
                      className="flex text-sm text-gray-600"
                    >
                      수정
                    </Link>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">캘린더 코드</span>
                    <span className="text-sm text-gray-600">
                      {c.calendarCode}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
          <Divider />
          <section className="grid gap-6">
            <header className="flex items-center">
              <h3>공유 캘린더</h3>
            </header>
            <div className="grid gap-6">
              {calendarState.shareCalendar.map((c) => (
                <div className="grid gap-2" key={c.id}>
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{c.calendarName}</span>
                    <Link
                      to={`/calendars/1/edit`}
                      className="flex text-sm text-gray-600"
                    >
                      수정
                    </Link>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">캘린더 코드</span>
                    <span className="text-sm text-gray-600">
                      {c.calendarCode}
                    </span>
                  </div>
                </div>
              ))}
              {!calendarState.shareCalendar.length && (
                <InfoMessageWrapper>캘린더가 아직 없어요 😒</InfoMessageWrapper>
              )}
            </div>
          </section>
          <Divider />
          <section className="grid gap-4">
            <h4>캘린더 연결하기</h4>
            <CalendarAddForm />
          </section>
        </div>
      </div>
    </div>
  )
}

export default CalendarSetting
