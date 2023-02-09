import axios from 'axios';
const baseUrl = 'http://localhost:3001/persons';

function getContact(id=undefined) {
  const request = id === undefined ? axios.get(baseUrl) : axios.get(`${baseUrl}/${id}`);
  return request.then(response => response.data);
}

const createContact = person => axios
    .post(baseUrl, person)
    .then(response => response.data);

const deleteContact = id => axios
    .delete(`${baseUrl}/${id}`)
    .then(response => response.data);

const people = { getContact, createContact, deleteContact };

export default people;
