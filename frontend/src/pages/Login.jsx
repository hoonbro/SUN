import { useState } from "react"
import { Link } from "react-router-dom"
import Welcome from "../components/ys/auth/Welcome"
import InputFormField from "../components/ys/common/InputFormField"
import SubmitButton from "../components/ys/common/SubmitButton"

const Login = () => {
  const [username, setUsername] = useState({
    key: "username",
    label: "아이디",
    type: "text",
    placeholder: "ex) admin",
    value: "",
    disabled: false,
  })
  const [password, setPassword] = useState({
    key: "password",
    label: "비밀번호",
    type: "password",
    placeholder: "비밀번호를 입력하세요",
    value: "",
    disabled: false,
  })

  const isDisabled = username.value && password.value ? false : true

  const handleButtonClick = () => {
    alert("handleButtonClick() 실행")
    console.log({ username: username.value, password: password.value })
  }

  return (
    <div className="py-10 px-6 grid gap-10">
      <Welcome />
      <div className="grid gap-6">
        <InputFormField field={username} setField={setUsername} />
        <InputFormField field={password} setField={setPassword} />
      </div>
      <div className="grid gap-4">
        <SubmitButton
          disabled={isDisabled}
          handleButtonClick={handleButtonClick}
        >
          로그인
        </SubmitButton>
        <div className="grid gap-2">
          <Link
            className="font-bold text-sm text-gray-700 text-center"
            to="/register"
          >
            팅글 회원가입
          </Link>
          <Link
            className="font-bold text-sm text-gray-700 text-center"
            to="/find-auth"
          >
            아이디 / 비밀번호 찾기
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Login
