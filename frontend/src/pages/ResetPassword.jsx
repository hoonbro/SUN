import { useLocation } from "react-router"
import Header from "../components/Header"
import LabelInput from "../components/LabelInput"
import useInputs from "../hooks/useInputs"
import { passwordValidator } from "../lib/validators"
import Button from "../components/Button"
import { useMemo } from "react"

function useQuery() {
  return new URLSearchParams(useLocation().search)
}

const ResetPassword = () => {
  const query = useQuery()

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

  return (
    <div className="bg-gray-50 min-h-full">
      <Header pageTitle="비밀번호 변경" to="/auth/find-auth" />
      <p>email: {query.get("email")}</p>
      <div className="container max-w-lg bg-white p-6 xs:rounded-xl xs:shadow-lg">
        <form className="grid gap-10">
          <div className="fields grid gap-4">
            <LabelInput
              label="새 비밀번호"
              onChange={handleChange}
              name="password"
              type="password"
              errors={password.errors}
              placeholder="문자, 숫자, 특수문자를 포함하여 8자 이상"
            />
            <LabelInput
              label="새 비밀번호 확인"
              onChange={handleChange}
              name="confirmPassword"
              type="password"
              placeholder="동일한 비밀번호를 입력하세요"
            />
          </div>
          <Button disabled={!canSubmit}>확인</Button>
        </form>
      </div>
    </div>
  )
}

export default ResetPassword
