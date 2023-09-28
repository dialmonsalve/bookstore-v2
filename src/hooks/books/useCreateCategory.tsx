import { createCategory } from "@/api/books";
import { useUisStore } from "@/store";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateCategory = () => {
  const queryClient = useQueryClient();
  const setErrorApiMessage = useUisStore((state) => state.setErrorMessage);
  const setAlert = useUisStore((state) => state.setAlert);

  const categoryMutation = useMutation(
    ({ name, username }: { name: string; username?: string }) =>
      createCategory(name, username),
    {
      onSuccess: async ({ hasError, message, category }) => {
        if (hasError) {
          setErrorApiMessage(true, message!);
          setTimeout(() => setErrorApiMessage(false), 3000);
          return;
        }
        queryClient.setQueriesData(["category"], category);
        queryClient.invalidateQueries(["categories"]);
        setAlert(true, "Categoría Creada con éxito");
      },
    }
  );

  return categoryMutation;
};
