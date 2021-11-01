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
    console.log(res)
    return Promise.resolve(res.data)
  } catch (error) {
    return Promise.reject(error.response)
  }
}

const auth = {
  register,
  checkDuplicateIdOREmail,
  login,
}
export default auth
