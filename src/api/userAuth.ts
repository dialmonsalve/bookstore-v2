import axios from 'axios'

import { bookstoreApi } from "@/api/bookstoreApi";

import { IClient, IStaff } from "@/types";

interface AuthResult { hasError: boolean, user?: IClient | IStaff, message?: string }

export const registerUser = async (fieldForm: { [key: string]: string, password: string }): Promise<AuthResult> => {
  
  try {
    const { data } = await bookstoreApi.post<IClient>('/user/register-user', fieldForm);
    return {
      hasError: false,
      user: data
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return {
        hasError: true,
        message: error.response?.data.message
      }
    }
  }
  return {
    hasError: true,
    message: 'No se pudo crear el usuario - intente nuevamente'
  }
}

export const handleLogin = async (fieldForm: { [key: string]: string, password: string }): Promise<AuthResult> => {
  const { email, password, username } = fieldForm;

  const formData = {
    email: !username ? (email || '') : '',
    username: username ? (username || '') : '',
    password,
  };

  try {
    const { data } = await bookstoreApi.post(`/user/login`, formData);

    return {
      hasError: false,
      user: data
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return {
        hasError: true,
        message: error.response?.data.message
      }
    }
  }
  return {
    hasError: true,
    message: 'No pudo iniciar sesión - intente nuevamente'
  }
}