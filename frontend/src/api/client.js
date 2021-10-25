import axios from "axios"

const client = axios.create("http://13.209.9.223:8080")

export function applyToken(token) {
  client.defaults.headers.common["Authorization"] = `Bearer ${token}`
}

export default client
