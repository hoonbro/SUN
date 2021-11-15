import { useMemo } from "react"
import auth from "../api/auth"
import useInputs from "../hooks/useInputs"
import { emailValidator } from "../lib/validators"
import Button from "./Button"
import LabelInput from "./LabelInput"

const FindIDForm = () => {
  const [formFields, handleChange] = useInputs({
    email: {
      value: "",
      errors: {},
      validators: [emailValidator],
    },
  })

  const { email } = formFields

  const canSubmit = useMemo(() => {
    return email.value.length && Object.keys(email.errors).length === 0
  }, [email])

  const handleSubmit = async (e, email) => {
    e.preventDefault()
    try {
      await auth.findId(email)
      alert("이메일로 아이디를 전송했습니다")
    } catch (error) {
      alert("존재하지 않는 이메일입니다")
    }
  }

  return (
    <form className="grid gap-6" onSubmit={(e) => handleSubmit(e, email.value)}>
      <LabelInput
        label="이메일"
        value={email.value}
        name="email"
        placeholder="ex) admin@sun.com"
        onChange={handleChange}
      />
      <Button disabled={!canSubmit}>아이디 찾기</Button>
    </form>
  )
}

export default FindIDForm
