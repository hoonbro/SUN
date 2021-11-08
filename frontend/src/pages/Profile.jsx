import { useEffect, useRef, useState, useCallback, useMemo } from "react"
import { Link, useParams, useHistory } from "react-router-dom"
import { MdAddPhotoAlternate } from "react-icons/md"
import { useAuthState } from "../context"
import Header from "../components/Header"
import client from "../api/client"

const Profile = () => {
  const params = useParams()
  const authDetails = useAuthState()
  const history = useHistory()
  const [loading, setLoading] = useState(true)
  const [profileUser, setProfileUser] = useState(null)

  const handleChangeFile = useCallback(async (e) => {
    const files = e.target.files || e.dataTransfer.files
    if (!files.length) {
      return
    }
    const formData = new FormData()
    formData.append("image", files[0])
    try {
      const res = await client.put("members/profile-image", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      const { url } = res.data
      setProfileUser((prevState) => ({ ...prevState, profileImage: url }))
    } catch (error) {
      alert("이미지 변경에 실패했습니다")
      console.log(error)
    }
  }, [])

  const inputEl = useRef(null)

  const handleClick = () => {
    inputEl.current.click()
  }

  const profileImage = useMemo(() => {
    return `https://d101s.s3.ap-northeast-2.amazonaws.com/${profileUser?.profileImage}`
  }, [profileUser])

  useEffect(() => {
    async function fetchProfileUser() {
      const res = await client.get(`members/${params.userId}`)
      setProfileUser(res.data)
      setLoading(false)
    }
    fetchProfileUser()
    return () => {}
  }, [params])

  return (
    <div className="min-h-full bg-gray-50 flex flex-col">
      <Header pageTitle="프로필" handleGoBack={() => history.goBack()} />
      <div className="py-10 h-full flex-1">
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
                src={
                  profileImage || "https://picsum.photos/seed/picsum/200/200"
                }
                className="object-cover h-full w-full"
                alt=""
              />
            </div>
            <div className="grid gap-2 content-start">
              <p className="font-medium">{loading ? "" : profileUser.name}</p>
              <p className="text-sm font-medium">
                {loading ? "" : profileUser.email}
              </p>
            </div>
          </div>
          <div>
            <p className="mb-2 font-medium text-sm text-gray-700">
              핸드폰 번호
            </p>
            <p className="pt-2 pb-3 px-2 border-b border-gray-300">
              {loading ? "" : profileUser.phone}
            </p>
          </div>
          <div>
            <p className="mb-2 font-medium text-sm text-gray-700">구분</p>
            <p className="pt-2 pb-3 px-2 border-b border-gray-300">
              {loading
                ? ""
                : profileUser.auth === "ROLE_TEACHER"
                ? "선생님"
                : "학생"}
            </p>
          </div>
          {+params.userId === +authDetails?.user?.id && (
            <Link to="/profile/edit" className="text-blue-400 justify-self-end">
              프로필 수정
            </Link>
          )}
        </div>
        <input
          type="file"
          className="hidden"
          onChange={handleChangeFile}
          ref={inputEl}
        />
      </div>
    </div>
  )
}

export default Profile
