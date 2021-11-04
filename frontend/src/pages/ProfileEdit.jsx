import { useCallback, useEffect } from "react"
import { Link } from "react-router-dom"
import client from "../api/client"
import Button from "../components/Button"
import Header from "../components/Header"
import LabelInput from "../components/LabelInput"
import useInputs from "../hooks/useInputs"
import { emailValidator } from "../lib/validators"

const dummyData = {
  name: "김병훈",
  phone: "01032943270",
  email: "kepy1106@gmail.com",
}

const ProfileEdit = () => {
  const [state, handleChange] = useInputs({
    name: {
      value: dummyData.name,
      errors: {},
      validators: [],
    },
    phone: {
      value: dummyData.phone,
      errors: {},
      validators: [],
    },
    email: {
      value: dummyData.email,
      errors: {},
      validators: [emailValidator],
    },
  })
  const { name, phone, email } = state

  const updateProfile = useCallback(async () => {
    const res = await client.put(`members`, {
      name: name.value,
      phone: phone.value,
      email: email.value,
    })
    console.log(res)
  }, [name, phone, email])

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(name.value, phone.value, email.value)
    updateProfile()
  }

  return (
    <div className="min-h-full bg-gray-50">
      <Header pageTitle="마이페이지" to="/profile/kepy1106@gmail.com" />
      <main className="container max-w-xl bg-white p-6 grid gap-2 xs:rounded-xl xs:shadow-lg">
        <form className="grid gap-10" onSubmit={handleSubmit}>
          <div className="grid gap-4">
            <LabelInput
              label="이름"
              onChange={handleChange}
              name="name"
              errors={name.errors}
              value={name.value}
            />
            <LabelInput
              label="핸드폰 번호"
              onChange={handleChange}
              name="phone"
              errors={phone.errors}
              value={phone.value}
            />
            <LabelInput
              label="이메일"
              onChange={handleChange}
              name="email"
              errors={email.errors}
              value={email.value}
            />
          </div>
          <Button>확인</Button>
        </form>
        <Link
          to="/profile/change-password"
          className="text-sm font-medium text-gray-700 place-self-center"
        >
          비밀번호 수정
        </Link>
      </main>
    </div>
  )
}

export default ProfileEdit
