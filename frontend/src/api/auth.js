import client from "./client"

const register = async (data) => {
  const res = await client.post("/auth", data)
  return res.data
}

const checkDuplicateIdOREmail = async ({ memberIdOrEmail, type }) => {
  switch (type) {
    case "memberId": {
      await client.get(`/auth/duplicate-id/${memberIdOrEmail}`)
      break
    }

    case "email": {
      await client.get(`/auth/duplicate-email/${memberIdOrEmail}`)
      break
    }
  }
}

const login = async (data) => {
  try {
    const res = await client.post("/auth/login", data)
    return Promise.resolve(res.data)
  } catch (error) {
    return Promise.reject(error.response)
  }
}

const findId = async (email) => {
  try {
    await client.post("auth/find-id", { email })
  } catch (error) {
    return Promise.reject(error.response)
  }
}

const sendPasswordResetCode = async (email) => {
  try {
    await client.post("auth/send-password-code", { email })
  } catch (error) {
    return Promise.reject(error.response)
  }
}

const authPasswordResetCode = async ({ email, code }) => {
  try {
    await client.post("auth/validate-password-code", { email, code })
  } catch (error) {
    return Promise.reject(error.response)
  }
}

const resetPassword = async ({ email, password }) => {
  try {
    await client.put("auth/reset-password", { email, password })
  } catch (error) {
    return Promise.reject(error.response)
  }
}

const auth = {
  register,
  checkDuplicateIdOREmail,
  login,
  findId,
  sendPasswordResetCode,
  authPasswordResetCode,
  resetPassword,
}
export default auth
