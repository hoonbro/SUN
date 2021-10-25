import { Link } from "react-router-dom"
import Header from "../components/Header"

const Profile = () => {
  return (
    <>
      <Header pageTitle="프로필" to="/" />
      <main className="grid gap-6 px-4">
        <div className="grid gap-6 select-none">
          <div>
            <p className="mb-2 font-medium text-sm text-gray-700">이름</p>
            <p className="pt-2 pb-3 px-2 border-b border-gray-300">김병훈</p>
          </div>
          <div>
            <p className="mb-2 font-medium text-sm text-gray-700">
              핸드폰 번호
            </p>
            <p className="pt-2 pb-3 px-2 border-b border-gray-300">
              01032943270
            </p>
          </div>
          <div>
            <p className="mb-2 font-medium text-sm text-gray-700">이메일</p>
            <p className="pt-2 pb-3 px-2 border-b border-gray-300">
              admin@sun.com
            </p>
          </div>
          <div>
            <p className="mb-2 font-medium text-sm text-gray-700">구분</p>
            <p className="pt-2 pb-3 px-2 border-b border-gray-300">선생님</p>
          </div>
        </div>
        <Link to="/profile/edit" className="text-blue-400">
          프로필 수정
        </Link>
      </main>
    </>
  )
}

export default Profile
