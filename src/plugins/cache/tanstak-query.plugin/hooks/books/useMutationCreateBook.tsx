import { useMutation, useQueryClient } from "@tanstack/react-query";

import { CreateBook } from "../../interfaces/tanstak-query.books";
import { IBook } from "@/types";

export function useMutationCreateBook(actionBook: CreateBook) {
  const { useRouter, useFormStore, useUIStore, useBooksStore, createBook } =
    actionBook;

  const router = useRouter();
  const queryClient = useQueryClient();

  const handleResetForm = useFormStore((state) => state.handleResetForm);
  const setAlert = useUIStore((state) => state.setAlert);
  const setNewBook = useBooksStore((state) => state.setNewBook);

  return useMutation({
    mutationFn: ({ book, username }: { book: IBook; username: string }) =>
      createBook(book, username),
    onSuccess: (book) => {
      setNewBook(book);
      queryClient.setQueriesData(["book"], book);

      queryClient.setQueryData<(IBook | null)[]>(["book"], (old) => {
        if (!old) return [book];
        return [...old, book];
      });

      // queryClient.invalidateQueries(["books"]);
      router.push("/bookstore/books");
      setAlert("success", true, "Libro Creado con éxito");
      handleResetForm({});
    },
    onError: (error: any) => {
      setAlert("error", true, error.message);
    },
  });
}
