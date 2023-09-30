import { useRouter } from "next/router";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useUisStore, useFormStore } from "@/store";

import { apiEmployee } from "@/api/";
import { IEmployee } from "@/types";

export const useUpdateEmployee = (_id: string) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const setAlert = useUisStore((state) => state.setAlert);
  const handleRestForm = useFormStore((state) => state.handleResetForm);

  return useMutation({
    mutationFn: (data: IEmployee) => apiEmployee.updateEmployee(_id, data),
    onSuccess: ({ hasError, message }) => {
      if (hasError) {
        setAlert("error", true, message);
        return;
      }
      queryClient.invalidateQueries(["employees"]);
      router.push("/admin/users");
      handleRestForm({});
      setTimeout(
        () => setAlert("success", true, "Usuario actualizado con éxito"),
        500
      );
    },
  });
};
