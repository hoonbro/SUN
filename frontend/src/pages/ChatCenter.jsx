import React, { useCallback, useRef, useState } from "react"
import { useHistory } from "react-router"
import Header from "../components/Header"
import gravatar from "gravatar"
import { IoEllipsisVertical } from "react-icons/io5"
import { Link } from "react-router-dom"

const ChatCenter = () => {
  const history = useHistory()
  const [menuOpen, setMenuOpen] = useState(false)
  const deleteBtnEl = useRef(null)

  const handleMenuOpen = useCallback(() => {
    setMenuOpen(true)
    // deleteBtnEl.current.focus()
    // MenuOpen이 변경되는 시점은 함수 내부의 코드가 모두 평가된 다음이다.
    // 따라서, deleteBtn이 렌더링되기 전에 focus() 시키려다보니 에러가 발생한다.
  }, [])
  const handleGoBack = useCallback(() => {
    history.goBack()
  }, [history])

  return (
    <div className="min-h-full flex flex-col">
      <Header pageTitle="채팅" handleGoBack={handleGoBack} />
      <div className="flex-1 h-full py-6 px-2">
        <div>
          <h2 className="px-2 mb-6">채팅</h2>
          <ul>
            <div className="p-2 rounded grid gap-4 hover:bg-gray-50">
              <div className="flex gap-2">
                <div className="img-wrapper w-12 h-12 rounded-full overflow-hidden">
                  <img
                    src={gravatar.url("a@a.com", { d: "retro", size: "48px" })}
                    alt="프로필 이미지"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 grid gap-1">
                  <p className="font-bold">김병훈</p>
                  <p className="text-sm font-medium">메세지 내용</p>
                </div>
                <div className="relative">
                  <button className="flex" onClick={handleMenuOpen}>
                    <IoEllipsisVertical size={18} />
                  </button>
                  {menuOpen && (
                    <div className="absolute bottom-0 right-0 bg-white w-12 shadow-lg rounded">
                      <button
                        className="text-sm font-medium text-red-500 py-1 px-2 w-full"
                        onBlur={() => setMenuOpen(false)}
                        ref={deleteBtnEl}
                      >
                        삭제
                      </button>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <Link
                  className={`py-1 px-2 font-medium text-sm rounded border border-orange-200 bg-orange-50
            `}
                  to={`/calendars`}
                >
                  과제 바로가기
                </Link>
                <span className="text-sm text-gray-500 ml-auto">3시간 전</span>
              </div>
            </div>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default ChatCenter
