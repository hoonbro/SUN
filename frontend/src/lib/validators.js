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
