import { useRouter } from "next/router";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useEmployeesStore } from "@/store/employee";
import { useUisStore } from "@/store/ui";

import { userAuth } from "@/api";
import { IEmployee } from "@/types";
import { useFormStore } from "@/store/form";

export function useRegisterEmployee() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const adminRole = useEmployeesStore((state) => state.session?.role);
  const userAdmin = useEmployeesStore((state) => state.session?.username);

  const setAlert = useUisStore((state) => state.setAlert);
  const setErrorApiMessage = useUisStore((state) => state.setErrorMessage);

  const handleResetForm = useFormStore((state) => state.handleResetForm);

  return useMutation(
    (data: IEmployee) =>
      userAuth.registerUser(data, { adminRole, userAdmin }, false),
    {
      onSuccess: async ({ hasError, message, user: employee }) => {
        if (hasError) {
          setErrorApiMessage(true, message!);
          setTimeout(() => setErrorApiMessage(false), 3000);
          return;
        }
        queryClient.setQueriesData(["credential-employee"], employee);
        queryClient.invalidateQueries(["employees"]);
        handleResetForm({});
        router.push("/admin/users");
        setAlert(true, "Usuario Creado con éxito");
      },
    }
  );
}
