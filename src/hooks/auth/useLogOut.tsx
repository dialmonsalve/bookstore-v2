import {  signOut, useSession } from "next-auth/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useLogOut () {

  const session = useSession();
  const queryClient = useQueryClient();

  const urlUser = !!session.data?.user?.username
  ? "/admin/auth"
    : "/auth/login";
  
  const logOut = useMutation({
    mutationFn: () => signOut({ callbackUrl: urlUser }),

    onSuccess: () => {
      queryClient.removeQueries();
    },
    onError: (error: any) => {
      console.log(error.message);
    },
  });

  return logOut
}
