import { useMemo, useState } from "react"
import { useHistory } from "react-router"
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

  const canSubmit = useMemo(() => {
    if (step === "sendEmail") {
      return email.value.length && !Object.keys(email.errors).length
    }
    return (
      Object.values(formFields).every((field) => field.value.length) &&
      Object.values(formFields).every(
        (field) => Object.keys(field.errors).length === 0
      )
    )
  }, [formFields, step, email])

  const handleSubmit = (e) => {
    e.preventDefault()
    switch (step) {
      case "sendEmail": {
        alert(`이메일 전송: ${email.value}`)
        setStep("confirmAuthcode")
        break
      }
      case "confirmAuthcode": {
        alert(`인증코드 확인: ${authcode.value}`)
        history.push(`/auth/reset-password?email=${email.value}`)
      }
    }
  }

  return (
    <form className="grid gap-6" onSubmit={(e) => handleSubmit(e, "id")}>
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
      <Button disabled={!canSubmit}>비밀번호 찾기</Button>
    </form>
  )
}

export default FindPWForm
