import axios from 'axios';
const baseUrl = '/api/persons';

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

const updateContact = updatedContact => axios
  .put(`${baseUrl}/${updatedContact.id}`, updatedContact)
  .then(response => response.data);

const people = { getContact, createContact, deleteContact, updateContact };

export default people;
