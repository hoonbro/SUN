import { applyToken } from "./client"
import client from "./client"

const getChatRoomInfo = async (missionId) => {
  try {
    console.log(missionId)
    console.log(
      JSON.parse(localStorage.getItem("currentUser")).token.accessToken
    )

    applyToken(
      JSON.parse(localStorage.getItem("currentUser")).token.accessToken
    )

    const res = await client.get(`/messages/mission/${missionId}`)
    console.log(res.data)
    return res.data
  } catch (error) {
    console.log(error.response)
  }
}

export default { getChatRoomInfo }
