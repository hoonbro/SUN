import client from "./client"

const createCalendar = async (calendarName) => {
  const res = await client.post(`calendar`, { calendarName })
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

const calendarAPI = {
  createCalendar,
  getCalendar,
  editCalendar,
}

export default calendarAPI
