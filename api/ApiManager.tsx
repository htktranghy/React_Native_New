import axios from 'axios';

const ApiManager = axios.create({
  baseURL: 'https://apiv2.uneti.edu.vn',
  responseType: 'json',
  withCredentials: true,
});

export default ApiManager;
