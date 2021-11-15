import axios from "axios"

const client = axios.create({ baseURL: "/api" })

client.interceptors.request.use((config) => {
  const tokenData = JSON.parse(localStorage.getItem("currentUser"))?.token
  if (!tokenData?.accessToken || config.url.includes("reissue")) {
    return config
  }
  const accessToken = tokenData.accessToken
  config.headers.Authorization = `Bearer ${accessToken}`
  return config
})

client.interceptors.response.use(
  (response) => response,
  async (error) => {
    const {
      config,
      response: { status },
    } = error
    if (status === 403) {
      const originalRequest = config
      const user = JSON.parse(localStorage.getItem("currentUser"))
      const refreshToken = user?.token?.refreshToken
      const { data } = await client.get("/auth/reissue", {
        headers: {
          refreshToken,
        },
      })
      const { accessToken: newAccessToken } = data
      localStorage.setItem(
        "currentUser",
        JSON.stringify({
          ...user,
          token: {
            ...user.token,
            accessToken: newAccessToken,
          },
        })
      )
      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
      return client(originalRequest)
    }
    if (status === 404) {
      if (config.url.includes("reissue")) {
        localStorage.removeItem("currentUser")
        window.history.go(0)
      }
    }
    return Promise.reject(error)
  }
)

export function applyToken(token) {
  client.defaults.headers.common["Authorization"] = `Bearer ${token}`
}

export function resetToken(token) {
  delete client.defaults.headers.common["Authorization"]
}

export default client
