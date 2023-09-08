import { authApi } from "@/api";
import { useEmployeesStore } from "@/store/users";
import { IEmployee } from "@/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const getEmployees = async (): Promise<IEmployee[] | null> => {

  try {
    const { data } = await authApi.get<IEmployee[] | null>('/');

    return data

  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.message)
    }
  }
  return null
}

export const useEmployee = () => {

  const employees = useEmployeesStore(state => state.employees);

  const employeesQuery = useQuery({

    queryFn: async () => {
      const data = await getEmployees()

      useEmployeesStore.getState().setEmployees(data)
      return data;
    },
    queryKey: ["employee"],
    refetchOnMount: true,

  })


  return { employeesQuery, employees }

}
