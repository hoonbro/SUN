let user = localStorage.getItem("currentUser")
  ? JSON.parse(localStorage.getItem("currentUser"))?.user
  : null

let token = localStorage.getItem("currentUser")
  ? JSON.parse(localStorage.getItem("currentUser"))?.token
  : null

export const authInitialState = {
  user,
  token,
  loading: false,
  errorMessage: "",
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
        errorMessage: "",
      }
    }
    case "TOKEN_REFRESH": {
      console.group("TOKEN_REFRESH")
      console.log(action.payload)
      console.groupEnd()
      return {
        ...initialState,
        token: {
          ...initialState.token,
          accessToken: action.payload.accessToken,
        },
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
    case "REFRESH_ERROR": {
      return {
        ...initialState,
        user: null,
        token: null,
      }
    }
    default: {
      throw new Error(`핸들링되지 않은 에러 ${action.type}`)
    }
  }
}
