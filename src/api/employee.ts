import { employeeApi } from ".";

import { IEmployee } from "@/types";
import { URL_CONSTANTS } from "@/constants";

interface Data {
  employees: IEmployee[] | null;
  totalEmployees: number;
}

//! Get all employees
export async function getEmployees(page: number): Promise<Data | null> {
  const params = new URLSearchParams();

  params.append("page", page?.toString());
  params.append("limit", `${URL_CONSTANTS.limit}`);

  try {
    const { data } = await employeeApi.get<Data>(``, { params });
    return data;
  } catch (error: any) {
    throw new Error(error.response?.data.message);
  }
}

//! Get a employee by id
export async function getEmployeeById(id: string): Promise<IEmployee | null> {
  try {
    const { data } = await employeeApi.get<IEmployee | null>(`/${id}`);
    return data;
  } catch (error: any) {
    throw new Error(error.response?.data.message);
  }
}

//! Update Employee
export async function updateEmployee(
  _id: string,
  employee: IEmployee
): Promise<IEmployee> {
  console.log(employee);

  try {
    const { data } = await employeeApi.put<IEmployee>(`/${_id}`, employee);
    return data;
  } catch (error: any) {
    throw new Error(error.response?.data.message);
  }
}

//! Delete one employee
export async function deleteEmployee(id: string): Promise<IEmployee | null> {
  try {
    await employeeApi.delete<IEmployee>(`/${id}`);

    return null;
  } catch (error: any) {
    throw new Error(error.response?.data.message);
  }
}
