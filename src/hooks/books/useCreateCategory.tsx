import { apiBook } from "@/api";
import { useUisStore } from "@/store";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateCategory() {
  const queryClient = useQueryClient();
  const setAlert = useUisStore((state) => state.setAlert);

  const createCategory = useMutation({
    mutationFn: ({ name, username }: { name: string; username?: string }) =>
      apiBook.createCategory(name, username),

    onSuccess: (category) => {
      queryClient.setQueriesData(["category"], category);
      queryClient.invalidateQueries(["categories"]);
      setAlert("success", true, "Categoría Creada con éxito");
    },
    onError: (error: any) => {
      setAlert("error", true, error.message);
    },
    
  });
  return createCategory;
}
