import client from "./client"

const createCalendar = async (calendarName) => {
  const res = await client.post(`calendar`, { calendarName })
  return res.data
}

const addShareCalendar = async ({ notificationId, calendarCode }) => {
  const res = await client.post(`calendar/share`, {
    notificationId,
    calendarCode,
  })
  return res.data
}

const getAllCalendarList = async () => {
  const res = await client.get("/calendar/every/calendars")
  return res.data
}

const getCalendar = async (calendarCode) => {
  const res = await client.get(`calendar/${calendarCode}`)
  return res.data
}

const editCalendar = async ({ calendarCode, calendarName }) => {
  const res = await client.put(`calendar/${calendarCode}`, { calendarName })
  return res.data
}

const deleteMyCalendar = async (calendarCode) => {
  await client.delete(`calendar/${calendarCode}`)
}

const deleteShareCalendar = async (calendarCode) => {
  await client.delete(`calendar/share/${calendarCode}`)
}

const getMissionList = async (params) => {
  const res = await client.get(`mission`, {
    params,
  })
  return res.data
}

const inviteUser = async ({ calendarCode, inviteeEmail }) => {
  const res = await client.post(`/members/invite`, {
    calendarCode,
    inviteeEmail,
  })
  return res.data
}

const createEvent = async (formData) => {
  const res = await client.post(`/mission`, formData)
  return res.data
}

const editEvent = async ({ eventId, formData }) => {
  const res = await client.put(`/mission/${eventId}`, formData)
  return res.data
}

const deleteEvent = async (eventId) => {
  await client.delete(`/mission/${eventId}`)
}

const calendarAPI = {
  createCalendar,
  addShareCalendar,
  getAllCalendarList,
  getCalendar,
  editCalendar,
  deleteMyCalendar,
  deleteShareCalendar,
  getMissionList,
  inviteUser,
  createEvent,
  editEvent,
  deleteEvent,
}

export default calendarAPI
