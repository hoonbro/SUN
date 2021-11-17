import axios from "axios"

const client = axios.create({ baseURL: "/api" })

client.interceptors.request.use((config) => {
  const token = JSON.parse(localStorage.getItem("currentUser"))?.token
    ?.accessToken
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export function applyToken(token) {
  client.defaults.headers.common["Authorization"] = `Bearer ${token}`
}

export function resetToken(token) {
  delete client.defaults.headers.common["Authorization"]
}

export default client
