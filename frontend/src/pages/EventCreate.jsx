import { useHistory } from "react-router"
import Header from "../components/Header"
import EventForm from "../components/EventForm"

const EventCreate = () => {
  const history = useHistory()

  const handleGoBack = () => {
    history.goBack()
  }

  return (
    <>
      <Header pageTitle="과제 등록" handleGoBack={handleGoBack} />
      <div className="container max-w-xl">
        <EventForm />
      </div>
    </>
  )
}

export default EventCreate
