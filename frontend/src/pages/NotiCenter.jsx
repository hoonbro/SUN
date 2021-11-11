import React, { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { IoEllipsisVertical } from "react-icons/io5"
import { useHistory } from "react-router"
import { Link } from "react-router-dom"
import useSWR from "swr"
import Header from "../components/Header"
import featcher from "../lib/featcher"

const NotiCard = ({
  missionName = "과제 제목",
  type = "",
  calendarCode,
  sender,
}) => {
  const [buttonLabel, setButtonLabel] = useState("")
  const [message, setMessage] = useState("")
  const [isCalendarEvent, setIsCalendarEvent] = useState(true)
  const [menuOpen, setMenuOpen] = useState(false)
  const deleteBtnEl = useRef(null)

  const role = useMemo(
    () => (sender.auth === "ROLE_STUDENT" ? "학생" : "선생님"),
    [sender]
  )

  const handleMenuOpen = useCallback(() => {
    setMenuOpen(true)
    // deleteBtnEl.current.focus()
    // MenuOpen이 변경되는 시점은 함수 내부의 코드가 모두 평가된 다음이다.
    // 따라서, deleteBtn이 렌더링되기 전에 focus() 시키려다보니 에러가 발생한다.
  }, [])

  useEffect(() => {
    if (menuOpen === true) {
      deleteBtnEl.current.focus()
    }
  }, [deleteBtnEl, menuOpen])

  useEffect(() => {
    switch (type) {
      case "invite": {
        setMessage("캘린더에 초대했어요.")
        break
      }
      case "mission_create": {
        setButtonLabel("과제 보러가기")
        setMessage("과제를 만들었어요.")
        setIsCalendarEvent(false)
        break
      }
      case "mission_update": {
        setButtonLabel("과제 보러가기")
        setMessage("과제를 변경했어요.")
        setIsCalendarEvent(false)
        break
      }
      case "mission_delete": {
        setButtonLabel("과제 보러가기")
        setMessage("과제를 지웠어요")
        setIsCalendarEvent(false)
        break
      }
      case "calendar_in": {
        setMessage("캘린더에 들어왔어요")
        break
      }
      case "calendar_out": {
        setMessage("캘린더에서 나갔어요")
        break
      }
    }
  }, [type])
  return (
    <div className="p-2 rounded grid gap-4 hover:bg-gray-50">
      <div className="flex gap-2">
        <div className="img-wrapper w-12 h-12 rounded-full overflow-hidden">
          <img
            src="https://i.ytimg.com/vi/y2YXl728YFg/maxresdefault.jpg"
            alt="프로필 이미지"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 grid gap-1">
          <div>
            <span className="font-bold">{sender.name} </span>
            <span>
              {role}이 {message}
            </span>
          </div>
          <p className="text-sm font-medium">{missionName}</p>
        </div>
        <div className="relative">
          <button className="flex" onClick={handleMenuOpen}>
            <IoEllipsisVertical size={18} />
          </button>
          {menuOpen && (
            <div className="absolute bottom-0 right-0 bg-white w-12 shadow-lg rounded">
              <button
                className="text-sm font-medium text-red-500 py-1 px-2 w-full"
                onBlur={() => setMenuOpen(false)}
                ref={deleteBtnEl}
              >
                삭제
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="flex items-center justify-between">
        {!isCalendarEvent && buttonLabel && (
          <Link
            className={`py-1 px-2 font-medium text-sm rounded border 
            ${type === "mission" && "border-orange-200 bg-orange-50"}
            ${type === "calendar" && "border-blue-200 bg-blue-50"}
            `}
            to={`/calendars/${calendarCode}/events/26`}
          >
            {buttonLabel}
          </Link>
        )}
        <span className="text-sm text-gray-500 ml-auto">3시간 전</span>
      </div>
    </div>
  )
}

const NotiCenter = () => {
  const { data: notiData, error } = useSWR("/notification", featcher)
  const history = useHistory()
  console.log(notiData)
  console.log(error)

  return (
    <div className="min-h-full bg-gray-50 flex flex-col">
      <Header pageTitle="알림" handleGoBack={() => history.goBack()} />
      <div className="py-10 h-full flex-1">
        <div className="container max-w-xl bg-white p-4 grid gap-6 select-none xs:rounded-xl xs:shadow-lg">
          <h3 className="px-2">새로운 알림</h3>
          {error && <p className="px-2">알림을 불러오다 미끄러졌어요</p>}
          {notiData !== undefined && !error && (
            <div className="grid gap-4">
              {notiData.map((noti) => (
                <NotiCard key={noti.id} {...noti} />
              ))}
              {/* <NotiCard type="invite" />
              <NotiCard type="mission_create" />
              <NotiCard type="mission_update" />
              <NotiCard type="mission_delete" />
              <NotiCard type="calendar_in" />
              <NotiCard type="calendar_out" /> */}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default NotiCenter
