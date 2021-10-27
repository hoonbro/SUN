import { Link } from "react-router-dom"
import { FcCalendar, FcReadingEbook } from "react-icons/fc"

const BottomNav = () => {
  return (
    <nav className="sticky bottom-0 left-0 w-full px-6 py-2 flex items-center justify-between border border-t border-gray-200 rounded-t-xl bg-white">
      <Link
        to="/"
        className={`flex flex-col gap-1 items-center w-14 text-gray-400 `}
      >
        <FcCalendar size="24px" />
        <span className="text-xs">캘린더</span>
      </Link>
      <Link
        to="/"
        className={`flex flex-col gap-1 items-center w-14 text-gray-400 `}
      >
        <FcCalendar size="24px" />
        <span className="text-xs">캘린더</span>
      </Link>
      <Link
        to="/"
        className={`flex flex-col gap-1 items-center w-14 text-gray-400 `}
      >
        <FcCalendar size="24px" />
        <span className="text-xs">캘린더</span>
      </Link>
      <Link
        to="/"
        className={`flex flex-col gap-1 items-center w-14 text-gray-400 `}
      >
        <FcCalendar size="24px" />
        <span className="text-xs">캘린더</span>
      </Link>
      <Link
        to="/profile/kepy1106@gmail.com"
        className={`flex flex-col gap-1 items-center w-14 text-gray-400 `}
      >
        <FcReadingEbook size="24px" />
        <span className="text-xs">프로필</span>
      </Link>
    </nav>
  )
}

export default BottomNav
