import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import { IEmployee } from "@/types";
import { authApi } from "@/api";
import axios from "axios";
import { useEmployeesStore } from "@/store/users";

const handleLogin = async (): Promise<IEmployee | null> => {
  
  try {
    const { data } = await authApi.get(`/search-user`);
  
    return data

  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.message)
    }
  }

  return null
}

export const useAuthentication = () => {

  const { data: nextSession, status } = useSession();

  const isEmployee = nextSession?.user?.username ? "credential-employee" : "credential-client";
 
  const sessionQuery = useQuery({   

    queryFn: async () => {

      if (status === 'authenticated') {
        const data = await handleLogin()
        useEmployeesStore.getState().setSession(data)
        return data;
      }
      return null;
    },
    queryKey: [ isEmployee],
    enabled: !!nextSession?.user?.email!,
  })


  return {
    sessionQuery,
    status
  };
}