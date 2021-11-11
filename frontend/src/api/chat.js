import client from "./client"

const getChatRoomInfo = async (missionId) => {
  try {
    const res = await client.get(`/messages/mission/${missionId}`)
    // console.log(res.data)
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

const sendFile = async (missionId, formData) => {
  // console.log(formData.get("file"))
  try {
    await client.post(`/messages/mission/${missionId}/file`, formData, {
      headers: {
        "Content-Type": `multipart/form-data`,
      },
    })
  } catch (error) {
    console.log(error.response)
  }
}

const getMissionInfo = async (missionId) => {
  try {
    const res = await client.get(`/mission/${missionId}`)
    // console.log(res.data)
    return res.data
  } catch (error) {
    console.log(error.response)
  }
}

export default { getChatRoomInfo, getHistory, sendFile, getMissionInfo }
