import client from "./client"

const updateProfile = async (formData) => {
  const res = await client.put(`members`, formData)
  return res.data
}

const getProfile = async (userPk) => {
  const res = await client.get(`members/${userPk}`)
  return res.data
}

const changePassword = async (password) => {
  await client.put(`members/change-password`, { password })
}

const memberAPI = {
  updateProfile,
  getProfile,
  changePassword,
}

export default memberAPI
