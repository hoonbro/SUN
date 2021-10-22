import Button from "../components/Button"
import Divider from "../components/Divider"
import FindIDForm from "../components/FIndIDForm"
import FindPWForm from "../components/FindPWForm"
import Header from "../components/Header"
import LabelInput from "../components/LabelInput"
import useInputs from "../hooks/useInputs"
import { emailValidator } from "../lib/validators"

const FindAuth = () => {
  const [{ email1, email2 }, handleChange] = useInputs({
    email1: {
      value: "",
      errors: {},
      validators: [emailValidator],
    },
    email2: {
      value: "",
      errors: {},
      validators: [emailValidator],
    },
  })

  const handleSubmitForFindID = (e, type) => {
    e.preventDefault()
    if (type === "id") {
      alert(`아이디 찾기: ${email1}`)
    } else if (type === "password") {
      alert(`비밀번호 찾기: ${email2}`)
    }
  }

  return (
    <>
      <Header
        pageTitle="아이디/비밀번호 찾기"
        to="/login"
        backPageTitle="로그인"
      />
      <div className="container px-6 py-10 grid gap-10">
        <div className="grid gap-4">
          <h6>아이디 찾기</h6>
          <FindIDForm />
        </div>
        <Divider />
        <div className="grid gap-4">
          <h6>비밀번호 초기화</h6>
          <FindPWForm />
        </div>
      </div>
    </>
  )
}

export default FindAuth
