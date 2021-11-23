import client from "./client"

const subscribeMe = async (id) => {
  await client.get(`/notification/subscribe/${id}`)
}

const subscribeCalendar = async (calendarCode) => {
  await client.get(`/notification/subscribe/calendar/${calendarCode}`)
}

const deleteNotification = async (notificationId) => {
  await client.delete(`/notification/${notificationId}`)
}

const notificationAPI = {
  deleteNotification,
  subscribeMe,
  subscribeCalendar,
}

export default notificationAPI
