import { useMemo, useState } from "react"
import { Link } from "react-router-dom"
import Welcome from "../components/ys/auth/Welcome"
import InputFormField from "../components/ys/common/InputFormField"
import SubmitButton from "../components/ys/common/SubmitButton"
import client from "../api/client"
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

  const isAllFill = memberId.value && password.value ? true : false
  const canSubmit = useMemo(() => {
    return isAllFill
  }, [isAllFill])

  const handleButtonClick = async () => {
    console.log({ memberId: memberId.value, password: password.value })
    const reqForm = {
      memberId: memberId.value,
      password: password.value,
    }
    try {
      const res = await client.post("/members/login", reqForm)
      localStorage.setItem("accessToken", res.data["access-token"])
      history.push({
        pathname: "/profile",
        state: { memberId: memberId.value },
      })
      console.log(res)
    } catch (error) {
      const { status } = error.response
      switch (status) {
        case 404: {
          alert("가입되지 않은 아이디입니다.")
          break
        }
        case 401: {
          alert("비밀번호가 일치하지 않습니다.")
        }
      }
    }
  }

  return (
    <div className="py-10 px-6 grid gap-10">
      <Welcome />
      <div className="grid gap-6">
        <InputFormField field={memberId} setField={setMemberId} />
        <InputFormField field={password} setField={setPassword} />
      </div>
      <div className="grid gap-4">
        <SubmitButton
          disabled={!canSubmit}
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
            to="/auth/find-auth"
          >
            아이디 / 비밀번호 찾기
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Login
