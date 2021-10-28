import { Link, useRouteMatch } from "react-router-dom"
import { FcSettings } from "react-icons/fc"
import { MdExpandMore, MdExpandLess } from "react-icons/md"
import { useState } from "react"
import CalendarAddForm from "./CalendarAddForm"

const CalendarListItem = ({
  name = "캘린더 이름",
  code = "캘린더 코드",
  active = false,
}) => {
  const [codeOpen, setCodeOpen] = useState(false)

  return (
    <div
      className={`grid gap-1 py-2 overflow-hidden transition-all ${
        codeOpen ? "h-16" : "h-10"
      }`}
    >
      <div className="flex items-center justify-between">
        <button className={`${active && "font-bold text-orange-500"}`}>
          {name}
        </button>
        <button className="flex" onClick={() => setCodeOpen(!codeOpen)}>
          {codeOpen ? <MdExpandLess size={20} /> : <MdExpandMore size={20} />}
        </button>
      </div>
      <div className="flex items-center justify-between text-sm ">
        <span>캘린더코드</span>
        <span className="text-gray-600">{code}</span>
      </div>
    </div>
  )
}

const CalendarAside = ({ asideOpen = false, setAsideOpen = (f) => f }) => {
  return (
    <>
      {asideOpen && (
        <div
          className="absolute top-0 left-0 w-screen h-screen z-20 bg-black bg-opacity-50"
          onClick={() => setAsideOpen(false)}
        ></div>
      )}
      <aside
        className={`absolute top-0 left-0 py-6 px-4 w-80 h-screen bg-white z-20 transition-all transform ${
          asideOpen ? "translate-x-0" : "-translate-x-80"
        }`}
      >
        <section className="grid gap-6 mb-10">
          <header className="flex items-center justify-between">
            <h3>캘린더 목록</h3>
            <Link to={`/calendars/setting`}>
              <FcSettings size={24} />
            </Link>
          </header>
          <div className="grid gap-2">
            <CalendarListItem name="남아리 학생의 캘린더" code="Dfaqe" active />
            <CalendarListItem name="죠르디 학생의 캘린더" code="Dfaqe" />
            <CalendarListItem name="앙몬드 학생의 캘린더" code="Dfaqe" />
          </div>
        </section>
        <hr />
        <section className="mt-6 grid gap-4">
          <h4>공유 캘린더 추가하기</h4>
          <CalendarAddForm />
        </section>
      </aside>
    </>
  )
}
export default CalendarAside
