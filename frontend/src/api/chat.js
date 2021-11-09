import client from "./client"

const getChatRoomInfo = async (missionId) => {
  try {
    const res = await client.get(`/messages/mission/${missionId}`)
    return res.data
  } catch (error) {
    console.log(error.response)
  }
}

const getHistory = async (roomId, currentPage, sizePerPage) => {
  try {
    const res = await client.get(`/messages/chatroom/${roomId}`, {
      params: { page: currentPage, size: sizePerPage },
    })
    return res.data
  } catch (error) {
    console.log(error.response)
  }
}

export default { getChatRoomInfo, getHistory }
