import { useHistory, useLocation } from "react-router"
import Header from "../components/Header"
import LabelInput from "../components/LabelInput"
import useInputs from "../hooks/useInputs"
import { passwordValidator } from "../lib/validators"
import Button from "../components/Button"
import { useCallback, useMemo } from "react"
import auth from "../api/auth"

function useQuery() {
  return new URLSearchParams(useLocation().search)
}

const ResetPassword = () => {
  const query = useQuery()
  const email = query.get("email")
  const history = useHistory()

  const [state, handleChange] = useInputs({
    password: {
      value: "",
      errors: {},
      validators: [passwordValidator],
    },
    confirmPassword: {
      value: "",
      errors: {},
      validators: [],
    },
  })
  const { password, confirmPassword } = state

  const canSubmit = useMemo(() => {
    return (
      password.value &&
      !Object.keys(password.errors).length &&
      password.value === confirmPassword.value
    )
  }, [password, confirmPassword])

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault()
      if (password.value !== confirmPassword.value) {
        alert("비밀번호가 일치하지 않습니다")
        return
      }
      try {
        await auth.resetPassword({ email, password: password.value })
        alert("비밀번호가 변경되었습니다")
        history.push("/login")
      } catch (error) {
        alert("비밀번호 변경 실패")
      }
    },
    [email, password, confirmPassword, history]
  )

  return (
    <div className="bg-gray-50 min-h-full flex flex-col">
      <Header pageTitle="비밀번호 변경" to="/auth/find-auth" />
      <p>email: {query.get("email")}</p>
      <div className="flex-1 h-full py-10">
        <div className="container max-w-lg bg-white p-6 xs:rounded-xl xs:shadow-lg">
          <form className="grid gap-10" onSubmit={(e) => handleSubmit(e)}>
            <div className="fields grid gap-4">
              <LabelInput
                label="새 비밀번호"
                onChange={handleChange}
                name="password"
                type="password"
                value={password.value}
                errors={password.errors}
                placeholder="문자, 숫자, 특수문자를 포함하여 8자 이상"
              />
              <LabelInput
                label="새 비밀번호 확인"
                onChange={handleChange}
                name="confirmPassword"
                type="password"
                value={confirmPassword.value}
                placeholder="동일한 비밀번호를 입력하세요"
              />
            </div>
            <Button disabled={!canSubmit}>확인</Button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ResetPassword
