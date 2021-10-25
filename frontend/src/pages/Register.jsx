import React, { useMemo, useState } from "react"
import { InputFormFieldMaker } from "../libs/ys-func"
import SubmitButton from "../components/ys/common/SubmitButton"
import RadioFormField from "../components/ys/common/RadioFormField"
import InputFormField from "../components/ys/common/InputFormField"
import Header from "../components/Header"

const Register = () => {
  // 아이디 ~ 이메일
  const [memberId, setMemberId] = useState(new InputFormFieldMaker("memberId"))
  const [password, setPassword] = useState(new InputFormFieldMaker("password"))
  const [passwordConfirm, setPasswordConfirm] = useState(
    new InputFormFieldMaker("passwordConfirm")
  )
  const [name, setName] = useState(new InputFormFieldMaker("name"))
  const [phone, setPhone] = useState(new InputFormFieldMaker("phone"))
  const [email, setEmail] = useState(new InputFormFieldMaker("email"))
  // 구분 (선생, 학생)
  const radioDiv = {
    name: "teacherOrStudent",
    options: [
      { key: "ROLE_TEACHER", label: "선생님" },
      { key: "ROLE_STUDENT", label: "학생" },
    ],
  }
  const [teacherOrStudent, setTeacherOrStudent] = useState("")

  // 유효성 검사
  const fieldsValue = [
    memberId.value,
    password.value,
    passwordConfirm.value,
    name.value,
    phone.value,
    email.value,
    teacherOrStudent,
  ]
  const isAllFill = useMemo(() => {
    return fieldsValue.every((item) => item !== "")
  }, [fieldsValue])
  const isMemberIdValid = useMemo(() => {
    const regex = /^[a-zA-Z0-9]{4,12}$/
    return regex.test(memberId.value)
  }, [memberId])
  const isPasswordValid = useMemo(() => {
    const regex =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,255}$/
    return regex.test(password.value)
  }, [password])
  const isPasswordConfirmValid = useMemo(() => {
    return password.value === passwordConfirm.value
  }, [password, passwordConfirm])
  const isNameValid = useMemo(() => {
    const regex1 = /^[가-힣]{1,8}$/
    const regex2 = /^[a-zA-Z]{2,8}$/
    return regex1.test(name.value) || regex2.test(name.value)
  }, [name])
  const isPhoneValid = useMemo(() => {
    const regex = /^01[016789][0-9]{6,8}$/
    return regex.test(phone.value)
  }, [phone])
  const isEmailValid = useMemo(() => {
    const regex = /^[\w\d-]+@[\w]+\.[\w]{1,3}(\.[\w]{1,3})*/
    return regex.test(email.value)
  }, [email])

  const canSubmit = useMemo(() => {
    // console.log("isAllFill:", isAllFill)
    // console.log("isMemberIdValid:", isMemberIdValid)
    // console.log("isPasswordValid:", isPasswordValid)
    // console.log("isPasswordConfirmValid:", isPasswordConfirmValid)
    // console.log("isNameValid:", isNameValid)
    // console.log("isPhoneValid:", isPhoneValid)
    // console.log("isEmailValid:", isEmailValid)
    // console.log("")
    return (
      isAllFill &&
      isPasswordValid &&
      isPasswordConfirmValid &&
      isNameValid &&
      isPhoneValid &&
      isEmailValid &&
      isMemberIdValid
    )
  }, [
    isAllFill,
    isPasswordValid,
    isPasswordConfirmValid,
    isNameValid,
    isPhoneValid,
    isEmailValid,
    isMemberIdValid,
  ])

  const handleBlur = (e) => {
    console.log("blur")
    console.log(e.target.id)
    const targetId = e.target.id
    let state
    let setState
    if (targetId === "memberId") {
      state = memberId
      setState = setMemberId
    } else if (targetId === "password") {
      state = password
      setState = setPassword
    } else if (targetId === "passwordConfirm") {
      state = passwordConfirm
      setState = setPasswordConfirm
    } else if (targetId === "name") {
      state = name
      setState = setName
    } else if (targetId === "phone") {
      state = phone
      setState = setPhone
    } else if (targetId === "email") {
      state = email
      setState = setEmail
    }

    console.log(memberId)
  }

  // 제출 버튼 핸들링
  const handleButtonClick = () => {
    console.log(fieldsValue)
  }

  return (
    <>
      <Header pageTitle="회원가입" to="/login" backPageTitle="로그인" />
      <div className="grid gap-10 py-10">
        <div className="px-6 grid gap-10">
          <div className=" grid gap-4">
            <InputFormField
              field={memberId}
              setField={setMemberId}
              handleBlur={handleBlur}
            />
            <InputFormField
              field={password}
              setField={setPassword}
              handleBlur={handleBlur}
            />
            <InputFormField
              field={passwordConfirm}
              setField={setPasswordConfirm}
              handleBlur={handleBlur}
            />
            <InputFormField
              field={name}
              setField={setName}
              handleBlur={handleBlur}
            />
            <InputFormField
              field={phone}
              setField={setPhone}
              handleBlur={handleBlur}
            />
            <InputFormField
              field={email}
              setField={setEmail}
              handleBlur={handleBlur}
            />

            <RadioFormField
              radioDiv={radioDiv}
              value={teacherOrStudent}
              setValue={setTeacherOrStudent}
            />
          </div>
          <SubmitButton
            disabled={!canSubmit}
            handleButtonClick={handleButtonClick}
          >
            회원 가입
          </SubmitButton>
        </div>
      </div>
    </>
  )
}

export default Register
