import axios from "axios"

const client = axios.create({ baseURL: "http://13.209.9.223:8080/api" })

export function applyToken(token) {
  console.log(token)
  // client.defaults.headers.common["Authorization"] = `Bearer ${token}`
}

export function resetToken(token) {
  delete client.defaults.headers.common["Authorization"]
}

export default client
