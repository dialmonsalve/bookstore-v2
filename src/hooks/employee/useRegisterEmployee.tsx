import { useRouter } from "next/router";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useEmployeesStore, useUisStore, useFormStore } from "@/store";

import { userAuth } from "@/api";
import { IEmployee } from "@/types";

export function useRegisterEmployee() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const adminRole = useEmployeesStore((state) => state.session?.role);
  const userAdmin = useEmployeesStore((state) => state.session?.username);

  const setAlert = useUisStore((state) => state.setAlert);

  const handleResetForm = useFormStore((state) => state.handleResetForm);

  return useMutation({
    mutationFn: (data: IEmployee) =>
      userAuth.registerUser(data, { adminRole, userAdmin }, false),
    onSuccess: async ({ hasError, message, user: employee }) => {
      if (hasError) {
        setAlert("error", true, message);
        return;
      }
      queryClient.setQueriesData(["credential-employee"], employee);
      queryClient.invalidateQueries(["employees"]);
      handleResetForm({});
      router.push("/admin/users");
      setAlert("success", true, "Usuario Creado con éxito");
    },
  });
}
