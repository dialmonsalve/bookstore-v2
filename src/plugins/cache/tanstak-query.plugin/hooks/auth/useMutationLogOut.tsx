import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Logout } from "../../../../interfaces/auth";

export function useMutationLogOut (logout:Logout) {

  const { signOut, useSession  } = logout

  const session = useSession();
  const queryClient = useQueryClient();

  const urlUser = !!session.data?.user?.username
  ? "/admin/auth"
    : "/auth/login";
  
  return useMutation({
    mutationFn: () => signOut({ callbackUrl: urlUser }),

    onSuccess: () => {
      queryClient.removeQueries();
    },
    onError: (error: any) => {
      console.log(error.message);
    },
  });
}
