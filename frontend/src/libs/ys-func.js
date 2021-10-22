export class InputFormFieldMaker {
  constructor(key, value = "", disabled = false) {
    this.key = key
    this.value = value
    this.disabled = disabled

    switch (key) {
      case "username": {
        this.label = "아이디"
        this.type = "text"
        this.placeholder = "ex) admin"
        break
      }
      case "password": {
        this.label = "비밀번호"
        this.type = "password"
        this.placeholder = "문자, 숫자, 특수문자를 포함하여 7자 이상"
        break
      }
      case "passwordConfirm": {
        this.label = "비밀번호 확인"
        this.type = "password"
        this.placeholder = "동일한 비밀번호를 입력하세요"
        break
      }
      case "name": {
        this.label = "이름"
        this.type = "text"
        this.placeholder = "한글 (1-8자) 또는 영어(2-8자)"
        break
      }
      case "phoneNum": {
        this.label = "핸드폰 번호"
        this.type = "text"
        this.placeholder = "(-)을 제외하고 숫자만 입력하세요"
        break
      }
      case "email": {
        this.label = "이메일"
        this.type = "text"
        this.placeholder = "ex) admin@tingle.com"
        break
      }
      default: {
      }
    }
  }
}
