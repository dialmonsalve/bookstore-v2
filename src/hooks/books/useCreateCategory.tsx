import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useUisStore } from "@/store";

import { apiBook } from "@/api";

export const useCreateCategory = () => {
  const queryClient = useQueryClient();
  const setAlert = useUisStore((state) => state.setAlert);

  return useMutation({
    mutationFn: ({ name, username }: { name: string; username?: string }) =>
    apiBook.createCategory(name, username),

    onSuccess: async ({ hasError, message, category }) => {
      if (hasError) {
        setAlert("error", true, message!);
        return;
      }
      queryClient.setQueriesData(["category"], category);
      queryClient.invalidateQueries(["categories"]);
      setAlert("success", true, "Categoría Creada con éxito");
    },
  });
};
