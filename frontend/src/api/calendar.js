import client from "./client"

const createCalendar = async (calendarName) => {
  const res = await client.post(`calendar`, { calendarName })
  return res.data
}

const addShareCalendar = async (calendarCode) => {
  const res = await client.post(`calendar/share`, { calendarCode })
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

const calendarAPI = {
  createCalendar,
  addShareCalendar,
  getAllCalendarList,
  getCalendar,
  editCalendar,
  deleteMyCalendar,
  deleteShareCalendar,
  getMissionList,
}

export default calendarAPI
