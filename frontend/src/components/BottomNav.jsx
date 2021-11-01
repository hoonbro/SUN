import { Link, useHistory } from "react-router-dom"
import { FcCalendar, FcReadingEbook } from "react-icons/fc"
import { logout, useAuthDispatch, useAuthState } from "../context"

const BottomNav = () => {
  const history = useHistory()
  const auth = useAuthState()
  const dispatch = useAuthDispatch()
  const handleLogout = async () => {
    await logout(dispatch, auth.token.refreshToken)
    history.push("/login")
  }

  return (
    <>
      {auth.token?.accessToken && (
        <nav className="fixed bottom-0 left-0 w-full px-6 py-2 flex items-center justify-between border border-t border-gray-200 rounded-t-xl bg-white">
          <Link
            key="캘린더"
            to="/"
            className={`flex flex-col gap-1 items-center w-14 text-gray-400 `}
          >
            <FcCalendar size="24px" />
            <span className="text-xs">캘린더</span>
          </Link>
          <Link
            key="캘린더2"
            to="/"
            className={`flex flex-col gap-1 items-center w-14 text-gray-400 `}
          >
            <FcCalendar size="24px" />
            <span className="text-xs">캘린더</span>
          </Link>
          <Link
            key="캘린더3"
            to="/"
            className={`flex flex-col gap-1 items-center w-14 text-gray-400 `}
          >
            <FcCalendar size="24px" />
            <span className="text-xs">캘린더</span>
          </Link>
          <Link
            key="프로필"
            to="/profile/kepy1106@gmail.com"
            className={`flex flex-col gap-1 items-center w-14 text-gray-400 `}
          >
            <FcReadingEbook size="24px" />
            <span className="text-xs">프로필</span>
          </Link>
          <button
            key="로그아웃"
            className={`flex flex-col gap-1 items-center w-14 text-gray-400 `}
            onClick={handleLogout}
          >
            <FcCalendar size="24px" />
            <span className="text-xs">로그아웃</span>
          </button>
        </nav>
      )}
    </>
  )
}

export default BottomNav
