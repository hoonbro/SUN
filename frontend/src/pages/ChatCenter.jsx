import React, { useCallback } from "react"
import { useHistory } from "react-router"
import Header from "../components/Header"
import useSWR from "swr"
import featcher from "../lib/featcher"
import NotiChatListItem from "../components/chat/NotiChatListItem"
import InfoMessageWrapper from "../components/InfoMessageWrapper"

const ChatCenter = () => {
  const history = useHistory()
  const { data: chatData, error } = useSWR(`/messages/chat/all`, featcher)

  const handleGoBack = useCallback(() => {
    history.goBack()
  }, [history])

  return (
    <div className="min-h-full bg-gray-50 flex flex-col">
      <Header pageTitle="채팅" handleGoBack={handleGoBack} />
      <div className="flex-1 h-full py-10">
        <div className="container max-w-xl bg-white p-4 grid gap-6 select-none xs:rounded-xl xs:shadow-lg">
          <h3 className="px-2">채팅</h3>
          {error && <p className="px-2">알림을 불러오다 미끄러졌어요</p>}
          {chatData && !error && !!chatData.content.length && (
            <ul className="grid gap-4">
              {chatData.content.map((chat) => (
                <NotiChatListItem key={chat.sentTime} {...chat} />
              ))}
            </ul>
          )}
          {!error && chatData && !chatData.content.length && (
            <InfoMessageWrapper>새로온 채팅이 없어요</InfoMessageWrapper>
          )}
        </div>
      </div>
    </div>
  )
}

export default ChatCenter
