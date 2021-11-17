import client from "./client"

const uploadFile = async (formData) => {
  const res = await client.post(`/file/teacher`, formData, {
    "Content-Type": "multipart/form-data",
  })
  return res.data
}

const deleteFile = async (fileUuid) => {
  await client.delete(`/file/teacher`, {
    params: {
      uuid: fileUuid,
    },
  })
}

const fileAPI = {
  uploadFile,
  deleteFile,
}

export default fileAPI
