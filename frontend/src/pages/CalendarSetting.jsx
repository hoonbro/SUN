import { useRouteMatch } from "react-router"
import { GrTableAdd } from "react-icons/all"
import Header from "../components/Header"
import Divider from "../components/Divider"
import { Link } from "react-router-dom"
import CalendarAddForm from "../components/calendar/CalendarAddForm"

const CalendarSetting = () => {
  const {
    params: { calendarId },
  } = useRouteMatch()
  return (
    <div className="bg-gray-50 min-h-full">
      <Header to={`/calendars/${calendarId}`} pageTitle="캘린더 관리" />
      <div className="container max-w-3xl p-6 bg-white grid gap-6 xs:gap-10 xs:shadow-lg xs:rounded-xl">
        <section className="grid gap-6">
          <header className="flex items-center justify-between">
            <h3>내 캘린더</h3>
            <Link to={`/calendars/create`} className="flex">
              <GrTableAdd />
            </Link>
          </header>
          <div className="grid gap-6">
            {[1, 2].map((i) => (
              <div className="grid gap-2" key={i}>
                <div className="flex items-center justify-between">
                  <span className="font-medium">죠르디 학생의 캘린더</span>
                  <Link
                    to={`/calendars/1/edit`}
                    className="flex text-sm text-gray-600"
                  >
                    수정
                  </Link>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">캘린더 코드</span>
                  <span className="text-sm text-gray-600">SUNFIRE</span>
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
            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <span className="font-medium">죠르디 학생의 캘린더</span>
                <button className="flex text-sm text-red-600">연결끊기</button>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">캘린더 코드</span>
                <span className="text-sm text-gray-600">SUNFIRE</span>
              </div>
            </div>
          </div>
        </section>
        <Divider />
        <section className="grid gap-4">
          <h4>캘린더 연결하기</h4>
          <CalendarAddForm />
        </section>
      </div>
    </div>
  )
}

export default CalendarSetting
