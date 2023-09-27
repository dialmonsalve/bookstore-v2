import axios from 'axios';

import { employeeApi } from '../';

import { IEmployee } from '@/types';
import { URL_CONSTANTS } from '@/constants';

interface Data {hasError: boolean, employees: IEmployee[] | null, message?: string, totalEmployees: number} 

//! Get all employees
export async function getEmployees(page: number): Promise<Data | null> {

  const params = new URLSearchParams();

  params.append('page', page?.toString())
  params.append('limit', `${URL_CONSTANTS.limit}`)

  try {
    const { data } = await employeeApi.get<Data>(``, { params });
    return data

  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.message)
    }
  }
  return null
}

//! Get a employee by id
export async function getEmployeeById(id: string): Promise<IEmployee | null> {

  try {
    const { data } = await employeeApi.get<IEmployee | null>(`/${id}`);
    return data

  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.message)
    }
  }
  return null
}

//! Update Employee
interface AuthResult { hasError: boolean, user?: IEmployee, message?: string }
export const updateEmployee = async (_id: string, employee: IEmployee): Promise<AuthResult> => {

  try {
    const { data } = await employeeApi.put<IEmployee>(`/${_id}`, employee);
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
    message: 'No se pudo actualizar el usuario - intente nuevamente'
  }
}

export const deleteEmployee = async (id: string): Promise<AuthResult> => {

  try {
    await employeeApi.delete<IEmployee>(`/${id}`)

    return {
      hasError: false
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
    message: 'No se pudo eliminar el usuario - intente nuevamente'
  }
}

