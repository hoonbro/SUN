import calendarAPI from "../api/calendar"
import client from "../api/client"
import memberAPI from "../api/member"

export const updateProfile = async (dispatch, formData) => {
  try {
    const profileRes = await memberAPI.updateProfile(formData)
    const user = { ...profileRes }
    const token = JSON.parse(localStorage.getItem("currentUser"))?.token
    dispatch({
      type: "UPDATE_PROFILE",
      payload: { ...profileRes },
    })
    localStorage.setItem(
      "currentUser",
      JSON.stringify({
        user,
        token,
      })
    )
    return user
  } catch (error) {
    alert("업데이트 에러")
  }
}

export const loginUser = async (dispatch, payload) => {
  try {
    const res = await client.post("/auth/login", payload)
    const user = res.data.member
    const token = {
      accessToken: res.data.accessToken,
      refreshToken: res.data.refreshToken,
    }
    dispatch({ type: "LOGIN_SUCCESS", payload: { user, token } })
    localStorage.setItem(
      "currentUser",
      JSON.stringify({
        user,
        token,
      })
    )
    // applyToken(token.accessToken)
    return Promise.resolve(res.data.member)
  } catch (error) {
    const { status } = error.response
    let errorMessage = "올바르지 않은 요청입니다"
    switch (status) {
      case 401: {
        errorMessage = "올바른 비밀번호를 입력하세요"
        break
      }
      case 404: {
        errorMessage = "가입하지 않은 아이디입니다"
        break
      }
    }
    dispatch({
      type: "LOGIN_ERROR",
      error: errorMessage,
    })
  }
}

export const logout = async (dispatch, refreshToken) => {
  try {
    localStorage.removeItem("currentUser")
    dispatch({ type: "LOGOUT" })
    await client.delete("/members/logout", {
      headers: {
        refreshToken,
      },
    })
  } catch (error) {
    console.log(error)
  }
}

export const silentRefresh = async (dispatch, refreshToken) => {
  if (!refreshToken) {
    localStorage.removeItem("currentUser")
    return
  }
  try {
    const res = await client.get("/auth/reissue", {
      headers: {
        refreshToken,
      },
    })
    dispatch({
      type: "TOKEN_REFRESH",
      payload: { accessToken: res.data?.data?.accessToken },
    })
    // applyToken(res.data?.data?.accessToken)
    const user = JSON.parse(localStorage.getItem("currentUser"))
    localStorage.setItem(
      "currentUser",
      JSON.stringify({
        ...user,
        token: {
          accessToken: res.data?.data?.accessToken,
          refreshToken,
        },
      })
    )
  } catch (error) {
    dispatch({
      type: "REFRESH_ERROR",
      error,
    })
    localStorage.removeItem("currentUser")
  }
}

export const getAllCalendar = async (dispatch) => {
  try {
    const calendarListRes = await calendarAPI.getAllCalendarList()
    dispatch({
      type: "SET_CALENDAR",
      payload: calendarListRes,
    })
  } catch (error) {
    console.log(error)
  }
}

export const addCalendar = (dispatch, newCalendar) => {
  dispatch({
    type: "ADD_CALENDAR",
    payload: newCalendar,
  })
}

export const editCalendar = (dispatch, newCalendar) => {
  dispatch({
    type: "EDIT_CALENDAR",
    payload: newCalendar,
  })
}

export const setCurrentCalendar = (dispatch, currentCalendarCode) => {
  dispatch({
    type: "SET_CURRENT_CALENDAR",
    payload: currentCalendarCode,
  })
  const currentUser = JSON.parse(localStorage.getItem("currentUser"))
  localStorage.setItem(
    "currentUser",
    JSON.stringify({ ...currentUser, currentCalendarCode })
  )
}

export const addNewNoti = (dispatch) => {
  dispatch({
    type: "NEW",
  })
}

export const clearNoti = (dispatch) => {
  dispatch({
    type: "CLEAR",
  })
}
