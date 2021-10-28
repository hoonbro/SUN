import { useRef } from "react"
import { Link } from "react-router-dom"
import { MdAddPhotoAlternate } from "react-icons/md"
import Header from "../components/Header"

const Profile = () => {
  const handleChangeFile = (e) => {
    console.log(e)
  }

  const inputEl = useRef(null)

  const handleClick = () => {
    inputEl.current.click()
  }

  return (
    <div className="min-h-full bg-gray-50">
      <Header pageTitle="프로필" to="/" />
      <div className="container max-w-xl bg-white p-6 grid gap-6 select-none xs:rounded-xl xs:shadow-lg">
        <div className="flex gap-4">
          <div className="w-20 h-20 rounded-full border overflow-hidden relative">
            <button
              className="absolute w-full h-full flex items-center justify-center opacity-0 bg-white bg-opacity-40 hover:opacity-100"
              onClick={handleClick}
            >
              <MdAddPhotoAlternate size={24} />
            </button>
            <img
              src="https://picsum.photos/seed/picsum/200/200"
              className="object-cover h-full w-full"
              alt=""
            />
          </div>
          <div className="grid gap-2 content-start">
            <p className="font-medium">김병훈</p>
            <p className="text-sm font-medium">figma@kakao.com</p>
          </div>
        </div>
        <div>
          <p className="mb-2 font-medium text-sm text-gray-700">핸드폰 번호</p>
          <p className="pt-2 pb-3 px-2 border-b border-gray-300">01032943270</p>
        </div>
        <div>
          <p className="mb-2 font-medium text-sm text-gray-700">구분</p>
          <p className="pt-2 pb-3 px-2 border-b border-gray-300">선생님</p>
        </div>
        <Link to="/profile/edit" className="text-blue-400 justify-self-end">
          프로필 수정
        </Link>
      </div>
      <input
        type="file"
        className="hidden"
        onChange={handleChangeFile}
        ref={inputEl}
      />
    </div>
  )
}

export default Profile
