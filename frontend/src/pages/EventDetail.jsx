import React, { useEffect, useState, useRef } from "react"
import { useRouteMatch } from "react-router"
import Header from "../components/Header"
import ChatController from "../components/ys/event/ChatController"
import ChatListContainer from "../components/ys/event/ChatListContainer"
import EventMaterial from "../components/ys/event/EventMaterial"
import ChatAPI from "../api/chat"
import * as SockJS from "sockjs-client"
import * as StompJS from "@stomp/stompjs"
// import SockJS from "sockjs-client"
// import Stomp from "stompjs"
import { useAuthState } from "../context"

export const ChatContext = React.createContext({})

const EventDetail = () => {
  const auth = useAuthState()
  const { eventId } = useRouteMatch().params

  const [missionId, setMissionId] = useState(null)
  const [roomId, setRoomId] = useState(null)

  const [chatHistory, setChatHistory] = useState([])
  const [lastPage, setLastPage] = useState(null)

  const [newChatList, setNewChatList] = useState([])

  useEffect(() => {
    const getChatInfo = async () => {
      console.log(eventId)
      const roomInfo = await ChatAPI.getChatRoomInfo(eventId)
      setMissionId(roomInfo.mission_id)
      setRoomId(roomInfo.room_id)
      console.log(roomInfo.room_id)
      const chatHistoryData = await ChatAPI.getHistory(roomInfo.room_id)
      console.log(chatHistoryData)
      setLastPage(chatHistoryData.totalPages - 1)
      setChatHistory([...chatHistoryData.content.reverse()])

      connect(roomInfo.room_id)
    }
    getChatInfo()

    return disconnect()
  }, [])

  const client = useRef({})

  const connect = (roomId) => {
    client.current = new StompJS.Client({
      webSocketFactory: () => new SockJS("http://13.209.9.223:8080/api/chat"),
      connectHeaders: { Authorization: `${auth.token?.accessToken}` },
      debug: function (str) {
        console.log(str)
      },
      reconnectDelay: 5000,
      onConnect: (frame) => {
        console.log(frame)
        subscribe(roomId)
      },
      onStompError: (frame) => {
        console.log(frame)
      },
    })
    client.current.activate()
  }

  const disconnect = () => {
    if (client.current.connected) client.current.deactivate()
  }

  const subscribe = (roomId) => {
    client.current.subscribe(`/room/${roomId}`, (res) => {
      setNewChatList([...newChatList, JSON.parse(res.body)])
    })
  }

  return (
    <ChatContext.Provider
      value={{ auth, missionId, chatHistory, client, newChatList }}
    >
      <div className="h-full flex flex-col">
        <Header
          pageTitle="(임시) Mom Loves Spot 읽기"
          to={`1`}
          backPageTitle="이전"
        />
        <EventMaterial />
        <hr />
        <ChatListContainer />
        <hr />
        <ChatController />
      </div>
    </ChatContext.Provider>
  )
}

export default EventDetail
