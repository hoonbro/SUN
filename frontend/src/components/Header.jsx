import { Link } from "react-router-dom"
import { IoIosArrowBack } from "react-icons/io"

const Header = ({
  pageTitle = "페이지 이름",
  to,
  backPageTitle = "뒤로가기",
  handleGoBack,
}) => {
  return (
    <header className="sticky z-10 left-0 top-0 py-4 mb-10 grid gap-2 bg-white shadow">
      {to && (
        <Link
          to={to}
          className="xs:absolute xs:left-2 xs:top-5 px-2 flex gap-1 items-center justify-self-start"
        >
          <IoIosArrowBack />
          <span className="text-sm font-medium">{backPageTitle}</span>
        </Link>
      )}
      {handleGoBack && (
        <button className="xs:absolute xs:left-2 xs:top-5 px-2 flex gap-1 items-center justify-self-start">
          <IoIosArrowBack />
          <span className="text-sm font-medium">{backPageTitle}</span>
        </button>
      )}
      <h3 className="place-self-center">{pageTitle}</h3>
    </header>
  )
}

export default Header
