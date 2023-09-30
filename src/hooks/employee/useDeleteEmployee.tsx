import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useUisStore } from "@/store/ui";

import { apiEmployee } from "@/api/";

const useDeleteEmployee = () => {
  const queryClient = useQueryClient();

  const setAlert = useUisStore((state) => state.setAlert);
  const setShowModal = useUisStore((state) => state.setShowModal);

  return useMutation({
    mutationFn: (id: string) => apiEmployee.deleteEmployee(id),

    onSuccess: ({ hasError, message }) => {
      if (hasError) {
        setAlert("error", true, message);

        return;
      }
      queryClient.invalidateQueries(["employees"]);
      setShowModal(false);
      setAlert("success", true, "Usuario eliminado con éxito");
    },
  });
};

export default useDeleteEmployee;
