import { IEmployee } from "@/types";
import { userApi } from ".";
import axios from "axios";

export async function getEmployees(): Promise<IEmployee[] | null> {

  try {
    const { data } = await userApi.get<IEmployee[] | null>('');
    return data

  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.message)
    }
  }
  return null
}

export async function getEmployeeById(id:string): Promise<IEmployee | null> {

    try {
    const { data } = await userApi.get<IEmployee | null>(`/${id}`);
    return data

  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.message)
    }
  }
  return null
}