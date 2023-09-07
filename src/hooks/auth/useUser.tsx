import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import { IStaff } from "@/types";
import { bookstoreApi } from "@/api";
import axios from "axios";
import { useEmployeesStore } from "@/store/users";

const handleLogin = async (): Promise<IStaff | null> => {
  
  try {
    const { data } = await bookstoreApi.get(`/users/search-user`);
  
    return data

  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.message)
    }
  }

  return null
}

export const useUser = () => {

  const { data: session, status } = useSession();

  const isStaff = session?.user?.username ? "credential-staff" : "credential-client";
 
  const user = useQuery({   

    queryFn: async () => {

      if (status === 'authenticated') {
        const data = await handleLogin()
        useEmployeesStore.getState().setSession(data); 
        return data;
      }
      return null;
    },
    queryKey: [ isStaff],
    enabled: !!session?.user?.email!,
  })


  return {
    user,
    status
  };
}