import { useHistory } from "react-router"
import Header from "../components/Header"

const EventCreate = () => {
  const history = useHistory()
  console.log(history)

  const handleGoBack = () => {
    history.goBack()
  }

  return (
    <>
      <Header pageTitle="과제 등록" handleGoBack={handleGoBack} />
    </>
  )
}

export default EventCreate
