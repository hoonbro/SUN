import client from "./client"

const deleteNotification = async (notificationId) => {
  await client.delete(`/notification/${notificationId}`)
}

const notificationAPI = {
  deleteNotification,
}

export default notificationAPI
