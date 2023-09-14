import axios from 'axios';

export const bookstoreApi = axios.create({
  baseURL:'http://localhost:3000/api'
});

export const userApi = axios.create({
  baseURL:'http://localhost:3000/api/users'
});
