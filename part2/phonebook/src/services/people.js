import axios from 'axios';
const baseUrl = 'http://localhost:3001/persons';

function get(id=undefined) {
  const request = id === undefined ? axios.get(baseUrl) : axios.get(`${baseUrl}/${id}`);
  return request.then(response => response.data);
}

const create = person => axios
    .post(baseUrl, person)
    .then(response => response.data);

export default { get, create }
