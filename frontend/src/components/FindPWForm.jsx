import { useCallback, useMemo, useState } from "react"
import { useHistory } from "react-router"
import auth from "../api/auth"
import useInputs from "../hooks/useInputs"
import { emailValidator } from "../lib/validators"
import Button from "./Button"
import LabelInput from "./LabelInput"

const FindPWForm = () => {
  const [formFields, handleChange] = useInputs({
    email: {
      value: "",
      errors: {},
      validators: [emailValidator],
    },
    authcode: {
      value: "",
      errors: {},
      validators: [],
    },
  })
  const history = useHistory()

  const { email, authcode } = formFields

  const [step, setStep] = useState("sendEmail")
  const [buttonLabel, setButtonLabel] = useState("비밀번호 찾기")
  const [loading, setLoading] = useState(false)

  const canSubmit = useMemo(() => {
    if (step === "sendEmail") {
      return email.value.length && !Object.keys(email.errors).length && !loading
    }
    return (
      Object.values(formFields).every((field) => field.value.length) &&
      Object.values(formFields).every(
        (field) => Object.keys(field.errors).length === 0
      ) &&
      !loading
    )
  }, [formFields, step, email, loading])

  const handleSubmit = useCallback(
    async (e, email = "", authcode = "") => {
      e.preventDefault()
      switch (step) {
        case "sendEmail": {
          try {
            setLoading(true)
            setButtonLabel("이메일 전송 중")
            await auth.sendPasswordResetCode(email)
            alert(`이메일 전송: ${email}`)
            // setButtonLabel("비")
            setStep("confirmAuthcode")
          } catch (error) {
            alert("존재하지 않는 이메일입니다")
          }
          setLoading(false)
          setButtonLabel("비밀번호 찾기")
          break
        }
        case "confirmAuthcode": {
          try {
            setLoading(true)
            setButtonLabel("인증번호 확인 중")
            await auth.authPasswordResetCode({ email, code: authcode })
            alert(`인증코드 확인: ${authcode}`)
            history.push(`/auth/reset-password?email=${email}`)
          } catch (error) {
            alert("올바르지 않은 코드입니다")
          }
          setLoading(false)
          setButtonLabel("비밀번호 찾기")
        }
      }
    },
    [history, step]
  )

  return (
    <form
      className="grid gap-6"
      onSubmit={(e) => handleSubmit(e, email.value, authcode.value)}
    >
      <LabelInput
        label="이메일"
        value={email.value}
        name="email"
        placeholder="ex) admin@sun.com"
        onChange={handleChange}
      />
      {step !== "sendEmail" && (
        <LabelInput
          label="인증코드"
          value={authcode.value}
          name="authcode"
          onChange={handleChange}
        />
      )}
      <Button disabled={!canSubmit}>{buttonLabel}</Button>
    </form>
  )
}

export default FindPWForm
