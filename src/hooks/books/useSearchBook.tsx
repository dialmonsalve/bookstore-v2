import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useBooksStore, useUisStore } from "@/store";

import { apiBook } from "@/api";

export function useSearchBook() {
  const setShowModal = useUisStore((state) => state.setShowModal);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (term: string) => apiBook.getSearchBooks(term),

    onSuccess: (books, variables, context) => {
      queryClient.setQueriesData(["search-books"], books);
      useBooksStore.getState().setFoundBooks(books);
      setShowModal(true);
    },
  });
}
