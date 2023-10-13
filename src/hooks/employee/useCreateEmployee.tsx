import { useRouter } from "next/router";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useUisStore, useFormStore, useEmployeesStore } from "@/store";

import { userAuth } from "@/api/";
import { IEmployee } from "@/types";
import { IClient } from "../../types/user";

export function useCreateEmployee() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const userAdmin = useEmployeesStore((state) => state.session?.username);
  const adminRole = useEmployeesStore((state) => state.session?.role);
  const setAlert = useUisStore((state) => state.setAlert);
  const handleResetForm = useFormStore((state) => state.handleResetForm);

  const createEmployeeMutation = useMutation({
    mutationFn: (data: IEmployee) =>
      userAuth.registerUser(data, { adminRole, userAdmin }, false),

    onSuccess: async (employee) => {
      queryClient.setQueriesData(["credential-employee"], employee);

      queryClient.setQueryData<(IClient | IEmployee | null)[]>(
        ["employees"],
        (old) => {
          if (!old) return [employee];
          return [...old, employee];
        }
      );
      // queryClient.invalidateQueries(["employees"]);
      handleResetForm({});
      router.push("/admin/users");
      setAlert("success", true, "Usuario Creado con éxito");
    },
    onError: (error: any) => {
      setAlert("error", true, error.message);
    },
  });

  return createEmployeeMutation;
}
