import { signIn } from "next-auth/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { userAuth } from "@/api";
import { IClient } from "@/types";
import { useUisStore } from "@/store";

export function useRegisterCLient() {
  const queryClient = useQueryClient();
  const setAlert = useUisStore((state) => state.setAlert);

  return useMutation({
    mutationFn: (data: IClient) => {
      return userAuth.registerUser(data, null, true);
    },

    onSuccess: async (client, { email, password, name }) => {
      queryClient.setQueriesData(["credential-client"], client);
      await signIn("credentials", { email, password, name });
      setAlert("success", true, "Usuario Creado con éxito");
    },
    onError: (error: any) => {
      setAlert("error", true, error.message);
    },
  });
}
