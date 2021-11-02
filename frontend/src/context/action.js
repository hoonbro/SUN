import client, { applyToken } from "../api/client"

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
    applyToken(token.accessToken)
    return res.data.member
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
    await client.delete("/members/logout", {
      headers: {
        refreshToken,
      },
    })
    dispatch({ type: "LOGOUT" })
    localStorage.removeItem("currentUser")
  } catch (error) {
    console.log(error)
  }
}

export const silentRefresh = async (dispatch, payload) => {
  if (!payload) {
    return
  }
  try {
    console.log(payload)
    const res = await client.get("/auth/reissue", {
      headers: {
        refreshToken: payload.refreshToken,
      },
    })
    dispatch({
      type: "TOKEN_REFRESH",
      payload: { accessToken: res.data?.data?.accessToken },
    })
    const user = JSON.parse(localStorage.getItem("currentUser"))
    localStorage.setItem(
      "currentUser",
      JSON.stringify({
        ...user,
        token: {
          accessToken: res.data?.data?.accessToken,
          refreshToken: payload.refreshToken,
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
