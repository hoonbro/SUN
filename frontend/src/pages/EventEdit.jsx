import { useHistory, useParams } from "react-router"
import Header from "../components/Header"
import EventForm from "../components/EventForm"
import calendarAPI from "../api/calendar"
import useSWRImmutable from "swr/immutable"
import featcher from "../lib/featcher"
import { useCallback } from "react"

const EventEdit = () => {
  const history = useHistory()
  const { calendarCode, eventId } = useParams()
  const { data: eventData } = useSWRImmutable(`/mission/${eventId}`, featcher)

  const handleGoBack = useCallback(() => {
    history.goBack()
  }, [history])

  const handleUpdate = useCallback(
    async (formData) => {
      try {
        const eventRes = await calendarAPI.editEvent({ eventId, formData })
        const ok = window.confirm("과제가 수정되었어요! 지금 보러 갈까요?")
        if (ok) {
          alert("과제 상세 페이지로 이동")
          history.push(
            `/calendars/${calendarCode}/events/${eventRes.missionId}`
          )
        } else {
          history.push(`/calendars/${calendarCode}`)
        }
      } catch (error) {
        switch (error.response.status) {
          case 400: {
            alert("필수 항목을 입력하세요")
            break
          }
          case 409: {
            alert("동일한 이름의 과제가 있어요")
            break
          }
          default: {
            alert("과제를 만들다가 미끄러졌어요")
            break
          }
        }
        console.log(error)
      }
    },
    [eventId, calendarCode, history]
  )

  const handleDelete = useCallback(async () => {
    try {
      await calendarAPI.deleteEvent(eventId)
      alert("과제가 삭제되었습니다")
      history.push(`/calendars/${calendarCode}`)
    } catch (error) {
      console.log(error)
      alert("과제가 삭제되지 않았습니다")
    }
  }, [eventId, calendarCode, history])

  return (
    <div className="flex flex-col min-h-full bg-gray-50">
      <Header pageTitle="과제 수정" handleGoBack={handleGoBack} />
      <div className="py-10 h-full flex-1">
        <div className="container max-w-lg bg-white p-6 xs:rounded-xl xs:shadow-lg">
          {eventData && (
            <EventForm
              onSubmit={handleUpdate}
              initData={eventData}
              onDelete={handleDelete}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default EventEdit
