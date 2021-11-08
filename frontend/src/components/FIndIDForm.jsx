import { useMemo } from "react"
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

  const handleSubmit = (e, email) => {
    e.preventDefault()
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
