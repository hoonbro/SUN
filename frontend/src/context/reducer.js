let user = localStorage.getItem("currentUser")
  ? JSON.parse(localStorage.getItem("currentUser"))?.user
  : null

let token = localStorage.getItem("currentUser")
  ? JSON.parse(localStorage.getItem("currentUser"))?.token
  : null

export const initialState = {
  user,
  token,
  loading: false,
  errorMessage: null,
}

export const AuthReducer = (initialState, action) => {
  switch (action.type) {
    case "REQUEST_LOGIN": {
      return {
        ...initialState,
        loading: true,
      }
    }
    case "LOGIN_SUCCESS": {
      return {
        ...initialState,
        user: action.payload.user,
        token: action.payload.token,
        loading: false,
      }
    }
    case "LOGOUT": {
      return {
        ...initialState,
        user: null,
        token: null,
      }
    }
    case "LOGIN_ERROR": {
      return {
        ...initialState,
        loading: false,
        errorMessage: action.error,
      }
    }
    default: {
      throw new Error(`핸들링되지 않은 에러 ${action.type}`)
    }
  }
}
