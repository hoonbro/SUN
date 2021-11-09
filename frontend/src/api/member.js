import client from "./client"

const updateProfile = async (formData) => {
  const res = await client.put(`members`, formData)
  return res.data
}

const getProfile = async (userPk) => {
  const res = await client.get(`members/${userPk}`)
  return res.data
}

const memberAPI = {
  updateProfile,
  getProfile,
}

export default memberAPI
