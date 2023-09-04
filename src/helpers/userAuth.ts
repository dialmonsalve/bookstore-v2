import axios from 'axios';

import { bookstoreApi } from "@/api/bookstoreApi";

import { IClient, IStaff } from "@/types";

export const registerUser = async (client: IClient): Promise<{ hasError: boolean, client?: IClient, message?: string }> => {

  const { email, password, name } = client;

  try {
    const { data } = await bookstoreApi.post<IClient>('/user/register-client', { email, password, name });
    return {
      hasError: false,
      client:data
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

export const handleLoginCLient = async (client: IClient): Promise<{ hasError: boolean, client?: IClient, message?: string }> => {
  const { email, password } = client;
  try {
    const { data } = await bookstoreApi.post('/user/login-client', { email, password });

    return {
      hasError: false,
      client:data
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





export const handleLoginStaff = async (staff: IStaff): Promise<{ hasError: boolean, staff?: IStaff, message?: string }> => {
  const { username, password } = staff;
  try {
    const { data } = await bookstoreApi.post('/user/login-staff', { username, password });

    return {
      hasError: false,
      staff:data
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