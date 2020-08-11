import axios from 'axios';

const client = axios.create({
  baseURL: 'http://52.79.207.8:3001/api',
});

export default client;
