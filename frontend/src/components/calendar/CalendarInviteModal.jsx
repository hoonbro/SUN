import React, { useCallback } from "react"
import { IoCloseOutline } from "react-icons/io5"
import calendarAPI from "../../api/calendar"
import Modal from "../modal/Modal"
import CalendarInviteForm from "./CalendarInviteForm"

const CalendarInviteModal = ({
  calendarName = "",
  calendarCode = "",
  onCloseModal = (f) => f,
}) => {
  const handleSubmit = useCallback(
    async (inviteeEmail) => {
      try {
        await calendarAPI.inviteUser({ calendarCode, inviteeEmail })
        onCloseModal()
        alert("초대를 완료했습니다")
      } catch (error) {
        console.error(error)
        switch (error.response?.status) {
          case 404: {
            alert("존재하지 않는 이메일입니다")
            break
          }
          case 409: {
            alert("이미 초대한 이용자입니다")
            break
          }
          default: {
            alert("초대장을 잃어버렸어요 ㅠㅠ")
            break
          }
        }
      }
    },
    [calendarCode, onCloseModal]
  )

  return (
    <Modal onClose={onCloseModal} maxHeight={false}>
      <header className={`flex py-4 justify-center relative`}>
        <h2>캘린더 초대하기</h2>
        <button className="absolute top-4 right-4">
          <IoCloseOutline size={24} onClick={onCloseModal} />
        </button>
      </header>
      <div className="p-6 flex-1">
        <div className="grid gap-4">
          <h3>{calendarName}</h3>
          <CalendarInviteForm onSubmit={handleSubmit} />
        </div>
      </div>
    </Modal>
  )
}

export default CalendarInviteModal
