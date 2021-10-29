import client from "../api/client"

export const loginUser = async (dispatch, payload) => {
  try {
    const res = await client.post("/auth/login", payload)
    if (res.status === 200) {
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
      return res.data.member
    }
    return
  } catch (error) {
    dispatch({
      type: "LOGIN_ERROR",
      error,
    })
  }
}

export const logout = async (dispatch) => {
  dispatch({ type: "LOGOUT" })
  localStorage.removeItem("currentUser")
  localStorage.removeItem("token")
}
