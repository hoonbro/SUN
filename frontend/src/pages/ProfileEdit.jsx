import { useCallback, useEffect } from "react"
import { Link, useHistory } from "react-router-dom"
import memberAPI from "../api/member"
import Button from "../components/Button"
import Header from "../components/Header"
import LabelInput from "../components/LabelInput"
import { updateProfile, useAuthDispatch, useAuthState } from "../context"
import useInputs from "../hooks/useInputs"
import { emailValidator } from "../lib/validators"

const ProfileEdit = () => {
  const authState = useAuthState()
  const authDispatch = useAuthDispatch()
  const history = useHistory()
  const [state, handleChange] = useInputs({
    name: {
      value: authState.user.name,
      errors: {},
      validators: [],
    },
    phone: {
      value: authState.user.phone,
      errors: {},
      validators: [],
    },
    email: {
      value: authState.user.email,
      errors: {},
      validators: [emailValidator],
    },
  })
  const { name, phone, email } = state

  const handleSubmit = async (e) => {
    e.preventDefault()
    const res = await updateProfile(authDispatch, {
      id: authState.user.id,
      name: name.value,
      phone: phone.value,
      email: email.value,
    })
    console.log(res)
    if (res) {
      history.replace(`/profile/${authState.user.id}`)
    }
  }

  return (
    <div className="min-h-full bg-gray-50 flex flex-col">
      <Header pageTitle="마이페이지" handleGoBack={() => history.goBack()} />
      <div className="flex-1 h-full py-10">
        <div className="container max-w-xl bg-white p-6 grid gap-2 xs:rounded-xl xs:shadow-lg">
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
        </div>
      </div>
    </div>
  )
}

export default ProfileEdit
