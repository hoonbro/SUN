import { useHistory, useParams } from "react-router"
import Header from "../components/Header"
import EventForm from "../components/EventForm"
import client from "../api/client"

const EventCreate = () => {
  const history = useHistory()
  const { calendarCode } = useParams()

  const handleGoBack = () => {
    history.goBack()
  }

  const handleCreate = async (formData) => {
    try {
      await client.post(`mission`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      const ok = window.confirm("과제가 생성되었어요! 지금 보러 갈까요?")
      if (ok) {
        alert("과제 상세 페이지로 이동")
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
  }

  return (
    <div className="flex flex-col min-h-full">
      <Header pageTitle="과제 등록" handleGoBack={handleGoBack} />
      <div className="py-10">
        <div className="container max-w-xl">
          <EventForm onSubmit={handleCreate} />
        </div>
      </div>
    </div>
  )
}

export default EventCreate
