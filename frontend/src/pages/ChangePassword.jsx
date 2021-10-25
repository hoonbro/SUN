import { useMemo } from "react"
import Button from "../components/Button"
import Header from "../components/Header"
import LabelInput from "../components/LabelInput"
import useInputs from "../hooks/useInputs"
import { passwordValidator } from "../lib/validators"

const ChangePassword = () => {
  const [state, handleChange] = useInputs({
    password: {
      value: "",
      errors: {},
      validators: [],
    },
    newPassword: {
      value: "",
      errors: {},
      validators: [passwordValidator],
    },
    newConfirmPassword: {
      value: "",
      errors: {},
      validators: [],
    },
  })
  const { password, newPassword, newConfirmPassword } = state

  const canSubmit = useMemo(() => {
    return (
      password.value &&
      newPassword.value &&
      !Object.keys(newPassword.errors).length &&
      newPassword.value === newConfirmPassword.value
    )
  }, [password, newPassword, newConfirmPassword])

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <>
      <Header pageTitle="비밀번호 수정" to="/profile/edit" />
      <div className="container px-4">
        <form className="grid gap-10" onSubmit={handleSubmit}>
          <div className="fields grid gap-4">
            <LabelInput
              label="현재 비밀번호"
              onChange={handleChange}
              name="password"
              type="password"
              errors={password.errors}
              placeholder="현재 비밀번호를 입력하세요"
            />
            <LabelInput
              label="새 비밀번호"
              onChange={handleChange}
              name="newPassword"
              type="password"
              errors={newPassword.errors}
              placeholder="문자, 숫자, 특수문자를 포함하여 8자 이상"
            />
            <LabelInput
              label="새 비밀번호 확인"
              onChange={handleChange}
              name="newConfirmPassword"
              type="password"
              placeholder="동일한 비밀번호를 입력하세요"
            />
          </div>
          <Button disabled={!canSubmit}>확인</Button>
        </form>
      </div>
    </>
  )
}

export default ChangePassword
