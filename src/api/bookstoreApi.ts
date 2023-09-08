import axios from 'axios';

export const bookstoreApi = axios.create({
  baseURL:'http://localhost:3000/api'
});

export const authApi = axios.create({
  baseURL:'http://localhost:3000/api/users'
});
