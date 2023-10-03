import { signIn } from "next-auth/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { userAuth } from "@/api";
import { useUisStore } from "@/store";

export function useLogin(fieldForm: string) {
  const queryClient = useQueryClient();
  const setAlert = useUisStore((state) => state.setAlert);

  return useMutation({
    mutationFn: (formData: { [key: string]: string; password: string }) => {
      const data = {
        [fieldForm]: formData[fieldForm],
        password: formData.password,
      };

      return userAuth.handleLogin(data);
    },

    onSuccess: async (user, formData) => {

      queryClient.setQueriesData(
        [
          fieldForm === "username"
            ? "credential-employee"
            : "credential-client",
        ],
        user
      );
      setAlert("success", true, "Ingreso correcto");
      await signIn("credentials", formData);
    },
    onError: (error:any) => {
      setAlert("error", true, error.message!);
    }
  });
}
