import { useMutation, useQueryClient } from "@tanstack/react-query";

import { RegisterUser } from "../../../../interfaces/auth";
import { IClient } from "@/types";

export function UseMutationRegisterUser(actionRegister: RegisterUser) {
  const { useUIStore, signIn, registerUser } = actionRegister;

  const queryClient = useQueryClient();
  const setAlert = useUIStore((state) => state.setAlert);

  return useMutation({
    mutationFn: (data: IClient) => {
      return registerUser(data, null, true);
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
