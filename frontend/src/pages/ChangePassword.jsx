import { useCallback, useMemo } from "react"
import { useHistory } from "react-router"
import memberAPI from "../api/member"
import Button from "../components/Button"
import Header from "../components/Header"
import LabelInput from "../components/LabelInput"
import { logout, useAuthDispatch, useAuthState } from "../context"
import useInputs from "../hooks/useInputs"
import { passwordValidator } from "../lib/validators"

const ChangePassword = () => {
  const history = useHistory()
  const authState = useAuthState()
  const authDispatch = useAuthDispatch()
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

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault()
      try {
        await memberAPI.changePassword(newPassword.value)
        alert("비밀번호를 변경하였습니다. 다시 로그인하세요")
        await logout(authDispatch, authState.token.refreshToken)
        history.push("/login")
      } catch (error) {
        alert("비밀번호 변경 실패")
      }
    },
    [history, newPassword, authDispatch, authState]
  )

  return (
    <div className="bg-gray-50 min-h-full flex flex-col">
      <Header pageTitle="비밀번호 수정" to="/profile/edit" />
      <div className="flex-1 h-full py-10">
        <div className="container max-w-xl p-6 bg-white xs:rounded-xl xs:shadow-lg">
          <form className="grid gap-10" onSubmit={handleSubmit}>
            <div className="fields grid gap-4">
              <LabelInput
                label="현재 비밀번호"
                onChange={handleChange}
                name="password"
                type="password"
                value={password.value}
                errors={password.errors}
                placeholder="현재 비밀번호를 입력하세요"
              />
              <LabelInput
                label="새 비밀번호"
                onChange={handleChange}
                name="newPassword"
                type="password"
                value={newPassword.value}
                errors={newPassword.errors}
                placeholder="문자, 숫자, 특수문자를 포함하여 8자 이상"
              />
              <LabelInput
                label="새 비밀번호 확인"
                onChange={handleChange}
                name="newConfirmPassword"
                type="password"
                value={newConfirmPassword.value}
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

export default ChangePassword
