import { useMutation, useQueryClient } from "@tanstack/react-query";

import { CreateCategory } from "@/plugins/interfaces";

export function useMutationCreateCategoryBook({
  useUIStore,
  createCategory,
}: CreateCategory) {
  const queryClient = useQueryClient();
  const setAlert = useUIStore((state) => state.setAlert);

  return useMutation({
    mutationFn: ({ name, username }: { name: string; username?: string }) =>
      createCategory(name, username),

    onSuccess: (category) => {
      queryClient.setQueriesData(["category"], category);
      queryClient.invalidateQueries(["categories"]);
      setAlert("success", true, "Categoría Creada con éxito");
    },
    onError: (error: any) => {
      setAlert("error", true, error.message);
    },
  });
}
