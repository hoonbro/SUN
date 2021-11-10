import React from "react"
import { IoEllipsisVertical } from "react-icons/io5"
import { useHistory } from "react-router"
import Header from "../components/Header"

const NotiCard = ({
  name = "김병훈",
  role = "선생님",
  message = "새로운 과제를 추가했어요",
  type = "mission",
  buttonLabel = "과제 바로가기",
  missionName = "과제 제목",
}) => {
  return (
    <div className="p-2 rounded grid gap-4 hover:bg-gray-50">
      <div className="flex gap-2">
        <div className="img-wrapper w-12 h-12 rounded-full overflow-hidden">
          <img
            src="https://i.ytimg.com/vi/y2YXl728YFg/maxresdefault.jpg"
            alt="프로필 이미지"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 grid gap-1">
          <div>
            <span className="font-bold">{name} </span>
            <span>
              {role}이 {message}
            </span>
          </div>
          <p className="text-sm font-medium">{missionName}</p>
        </div>
        <div>
          <button className="flex">
            <IoEllipsisVertical size={24} />
          </button>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <button
          className={`py-1 px-2 font-medium text-sm rounded border 
          ${type === "mission" && "border-orange-200 bg-orange-50"}
          ${type === "calendar" && "border-blue-200 bg-blue-50"}
          `}
        >
          {buttonLabel}
        </button>
        <span className="text-sm text-gray-500">3시간 전</span>
      </div>
    </div>
  )
}

const NotiCenter = () => {
  const history = useHistory()

  return (
    <div className="min-h-full bg-gray-50 flex flex-col">
      <Header pageTitle="알림" handleGoBack={() => history.goBack()} />
      <div className="py-10 h-full flex-1">
        <div className="container max-w-xl bg-white p-4 grid gap-6 select-none xs:rounded-xl xs:shadow-lg">
          <h3 className="px-2">새로운 알림</h3>
          <div className="grid gap-4">
            <NotiCard />
            <NotiCard message="과제를 변경했어요" />
            <NotiCard message="캘린더에 초대했어요" type="calendar" />
            <NotiCard
              message="캘린더에 참여했어요"
              type="calendar"
              name="선명준"
              role="학생"
              buttonLabel="캘린더 바로가기"
            />
            <NotiCard
              message="캘린더에서 나갔어요"
              type="calendar"
              name="선명준"
              role="학생"
              buttonLabel="캘린더 바로가기"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotiCenter
