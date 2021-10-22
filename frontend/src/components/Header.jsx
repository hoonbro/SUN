import { Link } from "react-router-dom"

function Header({ pageTitle = "페이지 이름", to, backPageTitle }) {
  return (
    <header className="py-4 flex items-center justify-center relative">
      {to && (
        <Link to={to} className="absolute left-2">
          {backPageTitle}
        </Link>
      )}
      <h5>{pageTitle}</h5>
    </header>
  )
}

export default Header
