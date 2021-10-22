import { useState } from "react"
import { InputFormFieldMaker } from "../libs/ys-func"
import InputFormField from "../components/ys/common/InputFormField"
import RadioFormField from "../components/ys/common/RadioFormField"
import SubmitButton from "../components/ys/common/SubmitButton"

const Register = () => {
  // 아이디 ~ 이메일
  const [username, setUsername] = useState(new InputFormFieldMaker("username"))
  const [password, setPassword] = useState(new InputFormFieldMaker("password"))
  const [passwordConfirm, setPasswordConfirm] = useState(
    new InputFormFieldMaker("passwordConfirm")
  )
  const [name, setName] = useState(new InputFormFieldMaker("name"))
  const [phoneNum, setPhoneNum] = useState(new InputFormFieldMaker("phoneNum"))
  const [email, setEmail] = useState(new InputFormFieldMaker("email"))

  // 구분
  const radioDiv = {
    name: "teacherOrStudent",
    options: [
      { key: "teacher", label: "선생님" },
      { key: "student", label: "학생" },
    ],
  }
  const [teacherOrStudent, setTeacherOrStudent] = useState("")

  // 회원가입 버튼
  const isAllValueFill = () => {
    const values = [
      username.value,
      password.value,
      passwordConfirm.value,
      name.value,
      phoneNum.value,
      email.value,
      teacherOrStudent,
    ]
    console.log(values)
    return values.every((value) => value !== "")
  }
  const handleSubmitButtonClick = () => {
    alert("handleSubmitButtonClick() 실행")
  }

  return (
    <div className="grid gap-10">
      <h1>회원가입</h1>

      <div className="px-6 grid gap-10">
        <div className=" grid gap-4">
          <InputFormField field={username} setField={setUsername} />
          <InputFormField field={password} setField={setPassword} />
          <InputFormField
            field={passwordConfirm}
            setField={setPasswordConfirm}
          />
          <InputFormField field={name} setField={setName} />
          <InputFormField field={phoneNum} setField={setPhoneNum} />
          <InputFormField field={email} setField={setEmail} />
          <RadioFormField
            radioDiv={radioDiv}
            value={teacherOrStudent}
            setValue={setTeacherOrStudent}
          />
        </div>
        <SubmitButton
          disabled={!isAllValueFill()}
          handleSubmitButtonClick={handleSubmitButtonClick}
        >
          회원가입
        </SubmitButton>
      </div>
    </div>
  )
}

export default Register
