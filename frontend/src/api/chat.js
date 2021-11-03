import client from "./client"

const getChatRoomInfo = async (missionId) => {
  try {
    const res = await client.get(`/messages/mission/${missionId}`, {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("currentUser")).token.accessToken
        }`,
      },
    })
    return res.data
  } catch (error) {
    console.log(error.response)
  }
}

const getHistory = async (roomId) => {
  try {
    const res = await client.get(`/messages/chatroom/${roomId}`, {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("currentUser")).token.accessToken
        }`,
      },
    })
    return res.data
  } catch (error) {
    console.log(error.response)
  }
}

export default { getChatRoomInfo, getHistory }
