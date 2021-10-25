import { useLocation } from "react-router"
import ResetPWForm from "../components/ResetPWForm"
import Header from "../components/Header"
import LabelInput from "../components/LabelInput"
import useInputs from "../hooks/useInputs"
import { passwordValidator } from "../lib/validators"
import Button from "../components/Button"
import { useMemo } from "react"

function useQuery() {
  return new URLSearchParams(useLocation().search)
}

const ChangePassword = () => {
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
    <>
      <Header pageTitle="비밀번호 변경" to="/auth/find-auth" />
      <p>email: {query.get("email")}</p>
      <div className="container px-6">
        <form className="grid gap-10">
          <div className="fields grid gap-4">
            <LabelInput
              label="새 비밀번호"
              onChange={handleChange}
              name="password"
              errors={password.errors}
              placeholder="문자, 숫자, 특수문자를 포함하여 8자 이상"
            />
            <LabelInput
              label="새 비밀번호 확인"
              onChange={handleChange}
              name="confirmPassword"
              placeholder="동일한 비밀번호를 입력하세요"
            />
          </div>
          <Button disabled={!canSubmit}>확인</Button>
        </form>
      </div>
      {/* <ResetPWForm /> */}
    </>
  )
}

export default ChangePassword
