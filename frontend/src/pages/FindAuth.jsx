import FindIDForm from "../components/FIndIDForm"
import FindPWForm from "../components/FindPWForm"
import Header from "../components/Header"

const FindAuth = () => {
  return (
    <div className="bg-gray-50 min-h-full">
      <Header
        pageTitle="아이디/비밀번호 찾기"
        to="/login"
        backPageTitle="로그인"
      />
      <div className="grid gap-10 container max-w-lg lg:grid-cols-2 lg:gap-4 lg:container lg:items-start">
        <div className="bg-white px-6 py-10 xs:rounded-xl xs:shadow">
          <div className="grid gap-4">
            <h4>아이디 찾기</h4>
            <FindIDForm />
          </div>
        </div>
        <div className="bg-white px-6 py-10 xs:rounded-xl xs:shadow">
          <div className="grid gap-4">
            <h4>비밀번호 초기화</h4>
            <FindPWForm />
          </div>
        </div>
      </div>
    </div>
  )
}

export default FindAuth
