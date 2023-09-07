import { bookstoreApi } from "@/api";
import { useEmployeesStore } from "@/store/users";
import { IStaff } from "@/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const getStaff = async (): Promise<IStaff[] | null> => {

  try {
    const { data } = await bookstoreApi.get(`/users`);
    
    return data

  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.message)
    }
  }
  return null
}

export const useStaff = () => {

  const staff = useQuery({

    queryFn: async () => {
      const data = await getStaff()
      useEmployeesStore.getState().setEmployees(data); 
      return data;
    },
    queryKey: ["staff"],
    refetchOnMount: true,
    
  })

  return staff

}
