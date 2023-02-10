import axios from 'axios'

const baseUrl = 'https://restcountries.com/v3.1'

const getAll = () => axios
  .get(`${baseUrl}/all`)
  .then(response => response.data);

const restcountries = { getAll };

export default restcountries;
