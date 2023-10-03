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

export const bookApi = axios.create({
  baseURL:'http://localhost:3000/api/books'
});

export const searchBooksApi = axios.create({
  baseURL:'https://www.googleapis.com/books/v1'
});

export const transactionApi = axios.create({
  baseURL:'http://localhost:3000/api/transactions'
});

