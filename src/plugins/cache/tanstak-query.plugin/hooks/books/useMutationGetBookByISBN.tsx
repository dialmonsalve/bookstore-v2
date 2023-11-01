import { useMutation } from "@tanstack/react-query";

import { GetBookByISBN } from "@/plugins/interfaces";

export function useMutationGetBookByISBN(actionBook: GetBookByISBN) {

  const { getBookByISBN, useBooksStore,  useUIStore} = actionBook
  const setBookByISBN = useBooksStore((state) => state.setBookByISBN);
  const setShowModal = useUIStore((state) => state.setShowModal);

  return useMutation({
    mutationFn: (isbn: string) => getBookByISBN(isbn),
    onSuccess: (book) => {
      setBookByISBN(book);
    },
    onError: (error: any) => {
      setShowModal(true, error.message!);
    },
  });
}
