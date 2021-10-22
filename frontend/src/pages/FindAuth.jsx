import Divider from "../components/Divider"
import FindIDForm from "../components/FIndIDForm"
import FindPWForm from "../components/FindPWForm"
import Header from "../components/Header"

const FindAuth = () => {
  return (
    <>
      <Header
        pageTitle="아이디/비밀번호 찾기"
        to="/login"
        backPageTitle="로그인"
      />
      <div className="container px-6 py-10 grid gap-10">
        <div className="grid gap-4">
          <h4>아이디 찾기</h4>
          <FindIDForm />
        </div>
        <Divider />
        <div className="grid gap-4">
          <h4>비밀번호 초기화</h4>
          <FindPWForm />
        </div>
      </div>
    </>
  )
}

export default FindAuth
