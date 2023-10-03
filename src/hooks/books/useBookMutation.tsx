import { apiBook } from "@/api";
import { useBooksStore, useFormStore, useUisStore } from "@/store";
import { IBook } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";

export function useBookMutation() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const handleResetForm = useFormStore((state) => state.handleResetForm);
  const setAlert = useUisStore((state) => state.setAlert);
  const setBookByISBN = useBooksStore((state) => state.setBookByISBN);
  const setNewBook = useBooksStore((state) => state.setNewBook);
  const setShowModal = useUisStore((state) => state.setShowModal);

  const createBookMutation = useMutation({
    mutationFn: ({ book, username }: { book: IBook; username: string }) =>
      apiBook.createBook(book, username),
    onSuccess: (book) => {
      setNewBook(book);
      queryClient.setQueriesData(["book"], book);
      queryClient.invalidateQueries(["books"]);
      router.push("/bookstore/books");
      setAlert("success", true, "Libro Creado con éxito");
      handleResetForm({});
    },
    onError: (error: any) => {
      setAlert("error", true, error.message);
    },
  });

  const createCategoryMutation = useMutation({
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

  const getBookByISBNMutation = useMutation({
    mutationFn: (isbn: string) => apiBook.getBookByIsbn(isbn),
    onSuccess: (book) => {
      setBookByISBN(book);
    },
    onError: (error: any) => {
      setShowModal(true, error.message!);
    },
  });

  const searchBookMutation = useMutation({
    mutationFn: (term: string) => apiBook.getSearchBooks(term),

    onSuccess: (books) => {
      queryClient.setQueriesData(["search-books"], books);
      useBooksStore.getState().setFoundBooks(books);
      setShowModal(true);
    },
    onError: (error: any) => {
      setAlert("error", true, error.message);
    },
  });
  return {
    createBookMutation,
    createCategoryMutation,
    getBookByISBNMutation,
    searchBookMutation,
  };
}
