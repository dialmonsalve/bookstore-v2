import { authApi } from "@/api";
import { Spinner } from "@/components/ui";
import { useEmployeesStore } from "@/store/employee";
import { IEmployee } from "@/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

async function getEmployees(): Promise<IEmployee[] | null> {

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

export default function useEmployees() {

  const setEmployees = useEmployeesStore(state => state.setEmployees);

  const employeesQuery = useQuery(

    ["employees"],
    async function(){
      const data = await getEmployees();
      if (data !== undefined) {
        setEmployees(data)
        return data;
      }
      return null
    },
    {
      staleTime: Infinity,
    }
  )

  return employeesQuery;
}
