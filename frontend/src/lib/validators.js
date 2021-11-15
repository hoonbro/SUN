export const emailValidator = (value) => {
  const regex = /^[\w\d][\w\d-]*@[\w\d][\w\d-]*\.([\w]{1,3})(\.[\w]{1,3})?$/
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

export const nameValidator = (value) => {
  const regex1 = /^[가-힣]{1,8}$/
  const regex2 = /^[a-zA-Z]{2,8}$/
  const type = "invalidName"
  const res = {
    type,
    valid: true,
    message: "",
  }
  if (!regex1.test(value) && !regex2.test(value)) {
    res.valid = false
    res.message = "한글(1-8자) 또는 영어(2-8자)"
  }
  return res
}

export const phoneValidator = (value) => {
  const regex = /^01[016789][0-9]{6,8}$/
  const type = "invalidPhone"
  const res = {
    type,
    valid: true,
    message: "",
  }
  if (!regex.test(value)) {
    res.valid = false
    res.message = "(-) 없이 숫자로만 입력해주세요"
  }
  return res
}

export const passwordValidator = (value) => {
  const regex = /(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}/
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
