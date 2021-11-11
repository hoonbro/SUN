import FindIDForm from "../components/FIndIDForm"
import FindPWForm from "../components/FindPWForm"
import Header from "../components/Header"

const FindAuth = () => {
  return (
    <div className="bg-gray-50 min-h-full flex flex-col">
      <Header
        pageTitle="아이디/비밀번호 찾기"
        to="/login"
        backPageTitle="로그인"
      />
      <div className="flex-1 h-full py-10">
        <div className="grid gap-10 container max-w-lg">
          <div className="px-6 py-10 xs:rounded-xl xs:shadow xs:bg-white">
            <div className="grid gap-4">
              <h4>아이디 찾기</h4>
              <FindIDForm />
            </div>
          </div>
          <div className="px-6 py-10 xs:rounded-xl xs:shadow xs:bg-white">
            <div className="grid gap-4">
              <h4>비밀번호 초기화</h4>
              <FindPWForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FindAuth
