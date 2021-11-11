import { Link, useHistory } from "react-router-dom"
import {
  IoCalendar,
  IoNotifications,
  IoChatboxEllipses,
  IoLogOut,
  IoPersonCircle,
} from "react-icons/io5"
import {
  logout,
  useAuthDispatch,
  useAuthState,
  useCalendarState,
} from "../context"

const BottomNav = () => {
  const history = useHistory()
  const authState = useAuthState()
  const calendarState = useCalendarState()
  const dispatch = useAuthDispatch()
  const handleLogout = async () => {
    await logout(dispatch, authState.token.refreshToken)
    history.push("/login")
  }

  return (
    <>
      {authState.token?.accessToken && (
        <nav className="sticky bottom-0 left-0 w-full px-6 py-2 flex items-center justify-between border border-t border-gray-200 rounded-t-xl bg-white">
          <Link
            key="캘린더"
            to={`/calendars/${calendarState.currentCalendarCode}`}
            className={`flex flex-col gap-1 items-center w-14 text-gray-400 `}
          >
            <IoCalendar size="24px" />
            <span className="text-xs">캘린더</span>
          </Link>
          <Link
            key="캘린더2"
            to="/notifications"
            className={`flex flex-col gap-1 items-center w-14 text-gray-400 `}
          >
            <IoNotifications size="24px" />
            <span className="text-xs">알림</span>
          </Link>
          <Link
            key="캘린더3"
            to="/"
            className={`flex flex-col gap-1 items-center w-14 text-gray-400 `}
          >
            <IoChatboxEllipses size="24px" />
            <span className="text-xs">채팅</span>
          </Link>
          <Link
            key="프로필"
            to={`/profile/${authState.user.id}`}
            className={`flex flex-col gap-1 items-center w-14 text-gray-400 `}
          >
            <IoPersonCircle size="24px" />
            <span className="text-xs">프로필</span>
          </Link>
          <button
            key="로그아웃"
            className={`flex flex-col gap-1 items-center w-14 text-gray-400 `}
            onClick={handleLogout}
          >
            <IoLogOut size="24px" />
            <span className="text-xs">로그아웃</span>
          </button>
        </nav>
      )}
    </>
  )
}

export default BottomNav
