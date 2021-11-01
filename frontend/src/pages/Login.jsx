import { useMemo, useState } from "react"
import { Link } from "react-router-dom"
import Welcome from "../components/ys/auth/Welcome"
import InputFormField from "../components/ys/common/InputFormField"
import SubmitButton from "../components/ys/common/SubmitButton"
import { loginUser, useAuthDispatch, useAuthState } from "../context"
import { useHistory } from "react-router"

const Login = () => {
  const history = useHistory()

  const [memberId, setMemberId] = useState({
    key: "memberId",
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

  // dispatch method 가져오기
  const dispatch = useAuthDispatch()
  const auth = useAuthState()

  const isAllFill = memberId.value && password.value ? true : false
  const canSubmit = useMemo(() => {
    return isAllFill
  }, [isAllFill])

  const handleLogin = async () => {
    console.log({ memberId: memberId.value, password: password.value })
    const reqForm = {
      memberId: memberId.value,
      password: password.value,
    }
    const user = await loginUser(dispatch, reqForm)
    console.log(user)
    if (user) {
      alert("임시: 로그인 성공")
      history.push(`/profile/${user.email}`)
    }
  }

  return (
    <div className="h-full flex items-center justify-center xs:bg-gray-50">
      <div className="grid gap-10 container max-w-lg px-6 py-10 xs:bg-white xs:shadow-lg xs:rounded-xl">
        <Welcome />
        <div className="grid gap-6">
          <InputFormField field={memberId} setField={setMemberId} />
          <InputFormField field={password} setField={setPassword} />
        </div>
        {auth.errorMessage}
        <div className="grid gap-4">
          <SubmitButton disabled={!canSubmit} handleButtonClick={handleLogin}>
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
              to="/auth/find-auth"
            >
              아이디 / 비밀번호 찾기
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
