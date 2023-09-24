import { signIn } from "next-auth/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { userAuth } from "@/api";
import { IClient, } from "@/types";
import { useUisStore } from "@/store";

export function useRegisterCLient() {

  const queryClient = useQueryClient();

  const setAlert = useUisStore(state => state.setAlert);
  const setErrorApiMessage = useUisStore(state => state.setErrorMessage);

  const registerCLient = useMutation({
    mutationFn: (data: IClient) => {
      return userAuth.registerUser(data, null, true);
    },
    onSuccess: async ({ hasError, message, user: client }, { email, password, name }) => {

      if (hasError) {
        setErrorApiMessage(true, message!)
        setTimeout(() => setErrorApiMessage(false), 3000);
        return;
      }
      queryClient.setQueriesData(["credential-client"], client);
      await signIn('credentials', { email, password, name });
      setTimeout(() => setAlert(true, "Usuario Creado con éxito"), 500);
    },
  })

  return registerCLient
}
