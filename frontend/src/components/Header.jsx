import { Link } from "react-router-dom"
import { IoIosArrowBack } from "react-icons/io"

function Header({ pageTitle = "페이지 이름", to, backPageTitle = "뒤로가기" }) {
  return (
    <header className="py-4 grid gap-2 relative">
      {to && (
        <div className="px-2">
          <Link to={to} className="flex gap-1 items-center">
            <IoIosArrowBack />
            <span className="text-sm font-medium">{backPageTitle}</span>
          </Link>
        </div>
      )}
      <h3 className="place-self-center">{pageTitle}</h3>
    </header>
  )
}

export default Header
