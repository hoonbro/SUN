import axios from "axios"

const client = axios.create({ baseURL: "/api" })

export function applyToken(token) {
  console.log(token)
  // client.defaults.headers.common["Authorization"] = `Bearer ${token}`
}

export function resetToken(token) {
  delete client.defaults.headers.common["Authorization"]
}

export default client
