import Header from "../components/Header"
import Chat from "../components/ys/event/Chat"
import EventMaterial from "../components/ys/event/EventMaterial"

const EventDetail = () => {
  return (
    <>
      <Header
        pageTitle="(임시) Mom Loves Spot 읽기"
        to={`1`}
        backPageTitle="이전"
      />
      <hr />
      <article className="px-6">
        <EventMaterial />
        <hr />
        <Chat />
      </article>
      <article>채팅form</article>
    </>
  )
}

export default EventDetail
