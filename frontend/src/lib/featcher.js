import client from "../api/client"

const featcher = (url) => client.get(url).then((res) => res.data)

export default featcher
