import Header from "../components/Header"
import ChatController from "../components/ys/event/ChatController"
import ChatListContainer from "../components/ys/event/ChatListContainer"
import EventMaterial from "../components/ys/event/EventMaterial"

const EventDetail = () => {
  return (
    <div className="h-full flex flex-col">
      <Header
        pageTitle="(임시) Mom Loves Spot 읽기"
        to={`1`}
        backPageTitle="이전"
      />
      {/* <EventMaterial /> */}
      <hr />
      <ChatListContainer />
      <hr />
      <ChatController />
    </div>
  )
}

export default EventDetail
