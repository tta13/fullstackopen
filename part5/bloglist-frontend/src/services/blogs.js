import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = newObject => {
  const config = {
    headers: { Authorization: token },
  }

  const request = axios.post(baseUrl, newObject, config)
  return request.then(response => response.data)
}

const like = blog => {
  const config = {
    headers: { Authorization: token },
  }

  const request = axios.put(`${baseUrl}/${blog.id}`, { likes: blog.likes + 1 }, config)
  return request.then(response => response.data)
}

const remove = id => {
  const config = {
    headers: { Authorization: token },
  }

  const request = axios.delete(`${baseUrl}/${id}`, config)
  return request
}

export default {
  getAll,
  create,
  setToken,
  like,
  remove,
}
