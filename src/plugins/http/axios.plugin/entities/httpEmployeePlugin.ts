import axios from "axios";

import { URL_CONSTANTS } from "@/constants";

import { DataEmployee } from "@/plugins/interfaces";
import { IEmployee } from "@/types";

export const httpEmployeePlugin = () => {
  
  const employeeApi =  axios.create({
    baseURL: "http://localhost:3000/api/employees",
  })

  //! Get all employees
  async function get(page: number): Promise<DataEmployee | null> {
    const params = new URLSearchParams();

    params.append("page", page?.toString());
    params.append("limit", `${URL_CONSTANTS.limit}`);

    try {
      const { data } = await employeeApi.get<DataEmployee>(``, { params });
      return data;
    } catch (error: any) {
      throw new Error(error.response?.data.message);
    }
  }

  //! Get a employee by id
  async function getById(id: string): Promise<IEmployee | null> {
    try {
      const { data } = await employeeApi.get<IEmployee | null>(`/${id}`);
      return data;
    } catch (error: any) {
      throw new Error(error.response?.data.message);
    }
  }

  //! Update Employee
  async function update(_id: string, employee: IEmployee): Promise<IEmployee> {
    try {
      const { data } = await employeeApi.put<IEmployee>(
        `/${_id}`,
        employee
      );
      return data;
    } catch (error: any) {
      throw new Error(error.response?.data.message);
    }
  }

  //! Delete one employee
  async function remove(id: string): Promise<IEmployee | null> {
    try {
      await employeeApi.delete<IEmployee>(`/${id}`);

      return null;
    } catch (error: any) {
      throw new Error(error.response?.data.message);
    }
  }

  return {
    get, 
    getById,
    update,
    remove
  }
};
