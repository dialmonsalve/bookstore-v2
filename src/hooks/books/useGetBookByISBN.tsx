import { apiBook } from "@/api";
import { useBooksStore, useUisStore } from "@/store";
import { useMutation } from "@tanstack/react-query";

export function useGetBookByISBN() {
  const setBookByISBN = useBooksStore((state) => state.setBookByISBN);
  const setShowModal = useUisStore((state) => state.setShowModal);

  const getBookByISBN = useMutation({
    mutationFn: (isbn: string) => apiBook.getBookByIsbn(isbn),
    onSuccess: (book) => {
      setBookByISBN(book);
    },
    onError: (error: any) => {
      setShowModal(true, error.message!);
    },
  });
  return getBookByISBN;
}
