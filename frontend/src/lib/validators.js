export const emailValidator = (value) => {
  const regex = /^[\w\d-]+@[\w]+\.[\w]{1,3}(\.[\w]{1,3})*/
  const type = "invalidEmail"
  const res = {
    type,
    valid: true,
    message: "",
  }
  if (!regex.test(value)) {
    res.valid = false
    res.message = "이메일을 다시 확인하세요"
  }
  return res
}

export const passwordValidator = (value) => {
  const regex =
    /(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}/
  const type = "invalidPassword"
  const res = {
    type,
    valid: true,
    message: "",
  }
  if (!regex.test(value)) {
    res.valid = false
    res.message = "문자, 숫자, 특수문자를 포함하여 8자 이상으로 입력하세요"
  }
  return res
}
