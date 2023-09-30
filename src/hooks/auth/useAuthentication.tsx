import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";

import { userAuth } from "@/api";
import { useEmployeesStore } from "@/store/employee";

export function useAuthentication() {
  const { data: nextSession, status } = useSession();

  const employee = nextSession?.user.username
    ? "credential-employee"
    : "credential-client";

  const sessionQuery = useQuery({
    queryKey: [employee],

    queryFn: async () => {
      if (status === "authenticated") {
        const data = await userAuth.searchUser();
        useEmployeesStore.getState().setSession(data);
        return data;
      }
      return null;
    },

    enabled: !!nextSession?.user?.email!,
    staleTime: Infinity,
    refetchOnMount: true,
  });

  return { sessionQuery, status, nextSession };
}
