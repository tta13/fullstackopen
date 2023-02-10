import axios from "axios";

const oneCallApi = 'https://api.openweathermap.org/data/2.5/weather';
const API_KEY = process.env.REACT_APP_API_KEY;
const params = { appid: API_KEY, units: 'metric' }
const iconsBaseUrl = 'http://openweathermap.org/img/wn/';

const getWeather = ({ lat, lon }) => {
  return axios
    .get(oneCallApi, { params: { ...params, lat, lon } })
    .then(response => response.data);
};

const weather = { getWeather, iconsBaseUrl };

export default weather;
