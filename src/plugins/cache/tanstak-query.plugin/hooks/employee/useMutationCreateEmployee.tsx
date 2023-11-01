import { useQueryClient, useMutation } from "@tanstack/react-query";

import { IClient, IEmployee } from "@/types";
import { CreateEmployee } from "@/plugins/interfaces";


export function useMutationCreateEmployee(employee: CreateEmployee) {
  const {
    useRouter,
    useFormStore,
    useEmployeesStore,
    useUIStore,
    registerUser,
  } = employee;
  const router = useRouter();
  const queryClient = useQueryClient();

  const userAdmin = useEmployeesStore((state) => state.session?.username);
  const adminRole = useEmployeesStore((state) => state.session?.role);
  const setAlert = useUIStore((state) => state.setAlert);
  const handleResetForm = useFormStore((state) => state.handleResetForm);

  return useMutation({
    mutationFn: (data: IEmployee) =>
      registerUser(data, { adminRole, userAdmin }, false),

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
}
