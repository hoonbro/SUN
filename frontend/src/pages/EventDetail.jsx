import React, {
  useEffect,
  useState,
  useRef,
  useReducer,
  useCallback,
} from "react"
import { useParams, useRouteMatch } from "react-router"
import { IoSettingsOutline } from "react-icons/io5"
import ChatController from "../components/ys/event/ChatController"
import ChatListContainer from "../components/ys/event/ChatListContainer"
import EventMaterial from "../components/ys/event/EventMaterial"
import ChatAPI from "../api/chat"
import * as SockJS from "sockjs-client"
import * as StompJS from "@stomp/stompjs"
import { useAuthState } from "../context"
import moment from "moment"
import { Link } from "react-router-dom"

export const ChatContext = React.createContext({})

const chatReducer = (state, action) => {
  switch (action.type) {
    case "HISTORY":
      return {
        chatList: [...action.payload.reverse(), ...state.chatList],
        status: "history",
      }
    case "NEW_MESSAGE":
      return {
        chatList: [...state.chatList, action.payload],
        status: "new_message",
      }
  }
}

const EventDetail = () => {
  const auth = useAuthState()
  const { calendarCode, eventId } = useParams()

  const [missionId, setMissionId] = useState(null)
  const [roomId, setRoomId] = useState(null)

  const [teacherFileList, setTeacherFileList] = useState([])
  const [missionInfo, setMissionInfo] = useState(null)

  const [chatState, dispatch] = useReducer(chatReducer, {
    chatList: [],
    status: null,
  })
  const [lastPage, setLastPage] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const sizePerPage = 15

  const getHistory = useCallback(
    async (roomId, currentPage) => {
      const chatHistoryData = await ChatAPI.getHistory(
        roomId,
        currentPage,
        sizePerPage
      )
      setCurrentPage(currentPage + 1)
      chatHistoryData.content = chatHistoryData.content.map((item) => {
        const chatItem = { ...item }
        if (item.pic_uri)
          chatItem.picUri = `https://d101s.s3.ap-northeast-2.amazonaws.com/${item.pic_uri}`
        if (item.fileName)
          chatItem.fileUri = `https://d101s.s3.ap-northeast-2.amazonaws.com/${calendarCode}/${item.room_id}/${item.fileUuid}`
        return chatItem
      })
      setLastPage(chatHistoryData.totalPages)
      dispatch({ type: "HISTORY", payload: chatHistoryData.content })
    },
    [calendarCode]
  )

  const client = useRef({})

  const disconnect = useCallback(() => {
    if (client.current.connected) client.current.deactivate()
  }, [])

  const subscribe = useCallback(
    (roomId) => {
      client.current.subscribe(`/room/${roomId}`, (res) => {
        let resData = JSON.parse(res.body)
        console.log(resData)

        if (resData.fileName) {
          resData = {
            ...resData,
            fileUri: `https://d101s.s3.ap-northeast-2.amazonaws.com/${calendarCode}/${resData.room_id}/${resData.fileUuid}`,
          }
          //   new Notification("새 메세지", { body: "파일" })
          // } else {
          //   new Notification("새 메세지", { body: resData.content })
        }
        console.log(resData)
        dispatch({ type: "NEW_MESSAGE", payload: resData })
      })
    },
    [calendarCode]
  )

  const connect = useCallback(
    (roomId) => {
      client.current = new StompJS.Client({
        webSocketFactory: () =>
          new SockJS("https://k5d101.p.ssafy.io/api/chat"),
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
    },
    [auth, subscribe]
  )

  useEffect(() => {
    // if (!("Notification" in window)) {
    //   alert("데스크톱 알림을 지원하지 않는 브라우저이다.")
    // }
    // Notification.requestPermission()

    const getMissionInfo = async () => {
      const roomInfo = await ChatAPI.getChatRoomInfo(eventId)
      setMissionId(roomInfo.mission_id)
      setRoomId(roomInfo.room_id)

      const missionInfo = await ChatAPI.getMissionInfo(eventId)
      console.log(missionInfo)
      missionInfo.teacherFileList.forEach((fileItem) => {
        fileItem.fileUri = `https://d101s.s3.ap-northeast-2.amazonaws.com/${fileItem.fileUuid}`
      })
      console.log(missionInfo)
      setTeacherFileList(missionInfo.teacherFileList)
      setMissionInfo(missionInfo)

      getHistory(roomInfo.room_id, 1)
      connect(roomInfo.room_id)
    }
    getMissionInfo()
    return disconnect()
  }, [calendarCode, eventId, connect, getHistory, disconnect])

  return (
    <ChatContext.Provider
      value={{
        auth,
        missionId,
        roomId,
        chatList: chatState.chatList,
        chatStatus: chatState.status,
        client,
        getHistory,
        lastPage,
        currentPage,
        setCurrentPage,
        sizePerPage,
        calendarCode,
        teacherFileList,
      }}
    >
      {missionInfo && (
        <div className="h-full flex flex-col">
          <header className="pt-4 grid gap-2 relative">
            <h3 className="text-center break-all truncate px-10">
              {missionInfo.title}
            </h3>
            <div className="flex flex-col gap-2 items-center">
              {!!missionInfo.tag.length && (
                <div className="flex justify-center gap-2">
                  {missionInfo.tag.map((tag) => (
                    <p className="text-gray-500 text-sm" key={tag}>
                      #{tag}
                    </p>
                  ))}
                </div>
              )}
              <div className="flex flex-col items-center gap-1 border-teal-400">
                <span className="text-xs font-bold">
                  {moment(missionInfo.start).format(
                    "YYYY. MM. DD (dd) HH:MM ~"
                  )}
                </span>
                <span className="text-xs">
                  {moment(missionInfo.end).format("YYYY. MM. DD (dd) HH:MM")}
                </span>
              </div>
            </div>
            <Link
              className="absolute top-4 right-4"
              to={`/calendars/${calendarCode}/events/${eventId}/edit`}
            >
              <IoSettingsOutline />
            </Link>
          </header>
          <EventMaterial />
          <hr />
          <ChatListContainer />
          <hr />
          <ChatController />
        </div>
      )}
    </ChatContext.Provider>
  )
}

export default EventDetail
