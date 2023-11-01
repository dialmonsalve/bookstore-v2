import { useMutation, useQueryClient } from "@tanstack/react-query";

import { SearchBook } from "@/plugins/interfaces";

export function useMutationSearchBook(actionBook: SearchBook) {
  const { useUIStore, useBooksStore, getSearchBooks } = actionBook;

  const queryClient = useQueryClient();
  const setShowModal = useUIStore((state) => state.setShowModal);
  const setAlert = useUIStore((state) => state.setAlert);
  const setFoundBooks = useBooksStore((state) => state.setFoundBooks);

  return useMutation({
    mutationFn: (term: string) => getSearchBooks(term),

    onSuccess: (books) => {
      queryClient.setQueriesData(["search-books"], books);
      setFoundBooks(books);
      setShowModal(true);
    },
    onError: (error: any) => {
      setAlert("error", true, error.message);
    },
  });
}
