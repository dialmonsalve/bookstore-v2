import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { userApi } from "@/api";
import { useEmployeesStore } from "@/store/employee";
import {  IEmployee } from "@/types";

async function handleLogin (): Promise<IEmployee | null> {
  
  try {
    const { data } = await userApi.get(`/search-user`);
  
    return data

  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.message)
    }
  }

  return null
}

export default function useAuthentication () {

  const { data: nextSession, status } = useSession();
 
  const sessionQuery = useQuery({

    queryFn: async () => {

      if (status === 'authenticated') {
        const data = await handleLogin()
        useEmployeesStore.getState().setSession(data)
        return data;
      }
      return null;
    },
    queryKey: [ "credentials"],
    enabled: !!nextSession?.user?.email!,
    staleTime: Infinity,
    refetchOnMount: true,
  })

  return {sessionQuery, status, nextSession}
  
}