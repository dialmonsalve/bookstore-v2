import { apiBook } from "@/api";
import { useBooksStore, useFormStore, useUisStore } from "@/store";
import { IBook } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";

export function useCreateBook() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const handleResetForm = useFormStore((state) => state.handleResetForm);
  const setAlert = useUisStore((state) => state.setAlert);
  const setNewBook = useBooksStore((state) => state.setNewBook);

  const createBook = useMutation({
    mutationFn: ({ book, username }: { book: IBook; username: string }) =>
      apiBook.createBook(book, username),
    onSuccess: (book) => {
      setNewBook(book);
      queryClient.setQueriesData(["book"], book);

   queryClient.setQueryData<(IBook | null)[]>(
        ["book"],
        (old) => {
          if (!old) return [book];
          return [...old, book];
        }
      );

      // queryClient.invalidateQueries(["books"]);
      router.push("/bookstore/books");
      setAlert("success", true, "Libro Creado con éxito");
      handleResetForm({});
    },
    onError: (error: any) => {
      setAlert("error", true, error.message);
    },
  });

  return createBook;
}
