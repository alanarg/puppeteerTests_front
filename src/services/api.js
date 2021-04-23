// import $ from 'jquery';
import axios from 'axios';

const api = axios.create({ baseURL: `https://cors-anywhere.herokuapp.com/${process.env.REACT_APP_API_URL}`});

export default api;



