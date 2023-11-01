import { useMutation, useQueryClient } from "@tanstack/react-query";

import { LoginUser } from "../../../../interfaces/auth";

export function useMutationLogin(fieldForm: string, actionRegister: LoginUser) {
  const { useUIStore, signIn, handleLogin } = actionRegister;
  const queryClient = useQueryClient();
  const setAlert = useUIStore((state) => state.setAlert);

  return useMutation({
    mutationFn: (formData: { [key: string]: string; password: string }) => {
      const data = {
        [fieldForm]: formData[fieldForm],
        password: formData.password,
      };

      return handleLogin(data);
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
    onError: (error: any) => {
      setAlert("error", true, error.message!);
    },
  });
}
