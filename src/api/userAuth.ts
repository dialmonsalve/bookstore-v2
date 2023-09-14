import axios from 'axios';

import { userApi } from '@/api/bookstoreApi';

import { IClient, IEmployee, TypeRole } from '@/types';

interface AuthResult { hasError: boolean, user?: IEmployee | IClient, message?: string }
interface Admin { adminRole: TypeRole[] | undefined, userAdmin: string | undefined }

export const registerUser = async (employee: IEmployee | IClient, admin: Admin |null, isClient: boolean): Promise<AuthResult> => {

  const endpoint = isClient ? 'client' : 'employee'

  if (!isClient) {
    const isAdmin = admin?.adminRole?.includes('admin')

    if (!isAdmin) {
      return {
        hasError: true,
        message: 'No está autorizado para esta operación'
      }
    }
  }

  try {
    const { data } = await userApi.post<IEmployee>(`/register-${endpoint}`, { ...employee, ...admin });
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
    const { data } = await userApi.post(`/login`, formData);

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