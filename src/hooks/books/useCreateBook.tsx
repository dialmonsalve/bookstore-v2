import { apiBook } from "@/api";
import {  useFormStore, useUisStore } from "@/store";
import { IBook } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";

export const useCreateBook = () => {
  const queryClient = useQueryClient();
  const setAlert = useUisStore((state) => state.setAlert);
  const router = useRouter()

  return useMutation({
    mutationFn: ({ book, username }: { book: IBook; username: string }) =>
      apiBook.createBook(book, username),
    onSuccess: ({ hasError, message, book }) => {
      if (hasError) {
        setAlert("error", true, message!);
        return;
      }
      queryClient.setQueriesData(["book"], book);
      queryClient.invalidateQueries(["books"]);
      setAlert("success", true, "Libro Creado con éxito");
      router.push('/bookstore/books')
      useFormStore.getState().handleResetForm({});
    },
  });
};
