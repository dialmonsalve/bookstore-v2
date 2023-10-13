import { useRouter } from "next/router";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useUisStore, useFormStore } from "@/store";

import { apiEmployee } from "@/api/";
import { IEmployee } from "@/types";

interface UpdateEmployee {
  _id: string;
  employee: IEmployee;
}
export function useUpdateEmployee() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const setAlert = useUisStore((state) => state.setAlert);
  const handleResetForm = useFormStore((state) => state.handleResetForm);

  const updateEmployeeMutation = useMutation({
    mutationFn: ({ _id, employee }: UpdateEmployee) =>
      apiEmployee.updateEmployee(_id, employee),
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

  return updateEmployeeMutation;
}
