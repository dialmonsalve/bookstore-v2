import { useMutation, useQueryClient } from "@tanstack/react-query";

import { IEmployee } from "@/types";
import { UpdateEmployee } from "../../interfaces/tanstak-query.employees";

interface MutationUpdateEmployee {
  _id: string;
  employee: IEmployee;
}
export function useMutationUpdateEmployee(actionEmployee: UpdateEmployee) {
  const { useRouter, useFormStore, useUIStore, updateEmployee } =
    actionEmployee;
  const router = useRouter();
  const queryClient = useQueryClient();

  const setAlert = useUIStore((state) => state.setAlert);
  const handleResetForm = useFormStore((state) => state.handleResetForm);

  return useMutation({
    mutationFn: ({ _id, employee }: MutationUpdateEmployee) =>
      updateEmployee(_id, employee),
    onSuccess: () => {
      queryClient.invalidateQueries(["employees"]);
      router.push("/admin/users");
      handleResetForm({});
      setTimeout(
        () => setAlert("success", true, "Usuario actualizado con éxito"),
        500
      );
    },
    onError: (error: any) => {
      setAlert("error", true, error.message);
    },
  });
}
