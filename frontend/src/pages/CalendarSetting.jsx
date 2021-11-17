import Header from "../components/Header"
import Divider from "../components/Divider"
import { Link } from "react-router-dom"
import CalendarAddForm from "../components/calendar/CalendarAddForm"
import { useCalendarState } from "../context"
import InfoMessageWrapper from "../components/InfoMessageWrapper"
import { useCallback } from "react"
import calendarAPI from "../api/calendar"
import CalendarListItem from "../components/calendar/CalendarListItem"
import useSWR, { useSWRConfig } from "swr"
import featcher from "../lib/featcher"

const CalendarSetting = () => {
  const calendarState = useCalendarState()
  const { data: calendarData } = useSWR("/calendar/every/calendars", featcher)
  const { mutate } = useSWRConfig()

  const handleDeleteMyCalendar = useCallback(
    async (calendarCode) => {
      try {
        const ok = window.confirm("삭제하시겠습니까?")
        if (!ok) {
          return
        }
        await calendarAPI.deleteMyCalendar(calendarCode)
        mutate("/calendar/every/calendars")
        alert("삭제되었습니다")
      } catch (error) {
        switch (error.response?.status) {
          case 400: {
            alert("기본 캘린더는 삭제할 수 없어요")
            break
          }
          case 401: {
            alert("내 캘린더만 삭제할 수 있어요")
            break
          }
        }
      }
    },
    [mutate]
  )

  const handleDeleteShareCalendar = useCallback(
    async (calendarCode) => {
      try {
        const ok = window.confirm("공유 캘린더를 삭제하시겠습니까?")
        if (!ok) {
          return
        }
        await calendarAPI.deleteShareCalendar(calendarCode)
        mutate("/calendar/every/calendars")
        alert("공유 캘린더가 삭제되었습니다")
      } catch (error) {
        alert("삭제 실패")
      }
    },
    [mutate]
  )

  return (
    <div className="bg-gray-50 min-h-full">
      {calendarData && (
        <>
          <Header
            pageTitle="캘린더 관리"
            to={`/calendars/${calendarState.currentCalendarCode}`}
          />
          <div className="py-10">
            <div className="container max-w-3xl py-6 px-4 bg-white grid gap-6 xs:gap-10 xs:shadow-lg xs:rounded-xl">
              <section className="grid gap-6">
                <header className="flex items-center justify-between px-2">
                  <h3>내 캘린더</h3>
                  <Link to={`/calendars/create`} className="flex">
                    <span className="text-sm text-orange-400 font-medium">
                      캘린더 추가
                    </span>
                  </Link>
                </header>
                <div className="grid gap-4">
                  {calendarData.myCalendar.map((c) => (
                    <CalendarListItem
                      key={c.calendarCode}
                      {...c}
                      onDelete={handleDeleteMyCalendar}
                    />
                  ))}
                </div>
              </section>
              <Divider />
              <section className="grid gap-6">
                <header className="flex items-center px-2">
                  <h3>공유 캘린더</h3>
                </header>
                <div className="grid gap-4">
                  {calendarData.shareCalendar.map((c) => (
                    <CalendarListItem
                      key={c.calendarCode}
                      myCalenar={false}
                      {...c}
                      onDelete={handleDeleteShareCalendar}
                    />
                  ))}
                  {!calendarData.shareCalendar.length && (
                    <InfoMessageWrapper>
                      캘린더가 아직 없어요 😒
                    </InfoMessageWrapper>
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
        </>
      )}
    </div>
  )
}

export default CalendarSetting
