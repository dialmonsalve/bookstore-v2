import axios from 'axios';

export const bookstoreApi = axios.create({
  baseURL:'http://localhost:3000/api'
});

export const userApi = axios.create({
  baseURL:'http://localhost:3000/api/auth'
});

export const employeeApi = axios.create({
  baseURL:'http://localhost:3000/api/employees'
});
