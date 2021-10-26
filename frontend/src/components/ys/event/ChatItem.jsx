import React from "react"

const ChatItem = ({ chatItem }) => {
  console.log(chatItem)
  return (
    <div>
      <div className="flex gap-2">
        <img
          src={chatItem.picture.default}
          alt="사진"
          className="rounded-full w-10 h-10"
        />
        <div>
          <p>
            {chatItem.name}{" "}
            {chatItem.auth === "ROLE_TEACHER" && <span>선생님</span>}
          </p>
          <p>어제 오후 06:01</p>
        </div>
      </div>
      <div>과제 등록했어요</div>
    </div>
  )
}

export default ChatItem
