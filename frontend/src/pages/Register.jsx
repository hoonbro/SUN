import React, { useMemo, useState } from "react"
import { InputFormFieldMaker } from "../libs/ys-func"
import SubmitButton from "../components/ys/common/SubmitButton"
import RadioFormField from "../components/ys/common/RadioFormField"
import InputFormField from "../components/ys/common/InputFormField"
import Header from "../components/Header"
import client from "../api/client.js"
import { useHistory } from "react-router"

const Register = () => {
  const history = useHistory()
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
      isMemberIdValid &&
      memberId.validMsg &&
      email.validMsg
    )
  }, [
    isAllFill,
    isPasswordValid,
    isPasswordConfirmValid,
    isNameValid,
    isPhoneValid,
    isEmailValid,
    isMemberIdValid,
    memberId.validMsg,
    email.validMsg,
  ])

  const handleBlur = async (e) => {
    const targetId = e.target.id
    let state, setState, isStateValid, error
    if (targetId === "memberId")
      [state, setState, isStateValid, error] = [
        memberId,
        setMemberId,
        isMemberIdValid,
        "영어 대소문자, 숫자(4-8자)를 입력해주세요",
      ]
    else if (targetId === "password")
      [state, setState, isStateValid, error] = [
        password,
        setPassword,
        isPasswordValid,
        "문자, 숫자, 특수문자를 포함하여 7자 이상",
      ]
    else if (targetId === "passwordConfirm")
      [state, setState, isStateValid, error] = [
        passwordConfirm,
        setPasswordConfirm,
        isPasswordConfirmValid,
        "동일한 비밀번호를 입력하세요",
      ]
    else if (targetId === "name")
      [state, setState, isStateValid, error] = [
        name,
        setName,
        isNameValid,
        "한글(1-8자) 또는 영어(2-8자)",
      ]
    else if (targetId === "phone")
      [state, setState, isStateValid, error] = [
        phone,
        setPhone,
        isPhoneValid,
        "잘못된 핸드폰 번호입니다",
      ]
    else if (targetId === "email")
      [state, setState, isStateValid, error] = [
        email,
        setEmail,
        isEmailValid,
        "잘못된 이메일 형식입니다",
      ]

    if (!state.value)
      setState({ ...state, error: "필수 입력값입니다", validMsg: "" })
    else if (!isStateValid) setState({ ...state, error, validMsg: "" })
    else if (targetId === "memberId" || targetId === "email") {
      const path = targetId === "memberId" ? "id" : "email"
      try {
        const res = await client.get(
          `/members/duplicate-${path}/${state.value}`
        )
        console.log(res)
        setState({
          ...state,
          error: "",
          validMsg: `사용 가능한 ${state.label}입니다`,
        })
      } catch (error) {
        console.log(error.response)
        if (error.response.status === 409)
          setState({
            ...state,
            error: `이미 가입한 ${state.label}입니다`,
            validMsg: "",
          })
      }
    } else setState({ ...state, error: "" })
  }

  // 제출 버튼 핸들링
  const handleButtonClick = async () => {
    const reqForm = {
      memberId: memberId.value,
      password: password.value,
      name: name.value,
      phone: phone.value,
      email: email.value,
      auth: teacherOrStudent,
    }
    console.log(reqForm)
    try {
      const res = await client.post(`/members`, reqForm)
      console.log(res)
      history.push({ pathname: "/login" })
    } catch (error) {
      console.log(error.response)
    }
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
              field={email}
              setField={setEmail}
              handleBlur={handleBlur}
            />
            <InputFormField
              field={phone}
              setField={setPhone}
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
