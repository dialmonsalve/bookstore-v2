import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";

import { userAuth } from "@/api";
import { useEmployeesStore } from "@/store/employee";

export default function useAuthentication () {

  const { data: nextSession, status } = useSession();
 
  const sessionQuery = useQuery({

    queryFn: async () => {

      if (status === 'authenticated') {
        const data = await userAuth.searchUser()
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