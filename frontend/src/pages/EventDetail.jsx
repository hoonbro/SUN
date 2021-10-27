import Header from "../components/Header"
import ChatListContainer from "../components/ys/event/ChatListContainer"
import EventMaterial from "../components/ys/event/EventMaterial"

const EventDetail = () => {
  return (
    <div className="flex-1 flex flex-col">
      <Header
        pageTitle="(임시) Mom Loves Spot 읽기"
        to={`1`}
        backPageTitle="이전"
      />
      <hr />
      <article className="flex-1 px-6 flex flex-col">
        <EventMaterial />
        <hr />
        <ChatListContainer />
      </article>
      <article className="p-2">채팅form</article>
    </div>
  )
}

export default EventDetail
