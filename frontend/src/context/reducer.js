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

export const calendarInitialState = {
  myCalendar: [],
  shareCalendar: [],
  currentCalendarCode: "",
}

export const CalendarReducer = (initialState, action) => {
  switch (action.type) {
    case "SET_CALENDAR": {
      return {
        ...initialState,
        ...action.payload,
      }
    }
    case "ADD_CALENDAR": {
      return {
        ...initialState,
        myCalendar: [...initialState.myCalendar, { ...action.payload }],
      }
    }
    case "EDIT_CALENDAR": {
      const calendar = { ...action.payload }
      const myCalendar = initialState.myCalendar.map((c) => {
        if (c.calendarCode === calendar.calendarCode) {
          return calendar
        }
        return c
      })
      return {
        ...initialState,
        myCalendar,
      }
    }
    case "SET_CURRENT_CALENDAR": {
      const currentCalendarCode = action.payload
      return {
        ...initialState,
        currentCalendarCode,
      }
    }
  }
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
    case "UPDATE_PROFILE": {
      return {
        ...initialState,
        user: action.payload,
      }
    }
    default: {
      throw new Error(`핸들링되지 않은 에러 ${action.type}`)
    }
  }
}
