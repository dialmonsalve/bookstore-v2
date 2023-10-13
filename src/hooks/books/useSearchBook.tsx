import { apiBook } from "@/api";
import { useBooksStore, useUisStore } from "@/store";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useSearchBook() {

  const queryClient = useQueryClient();
  const setShowModal = useUisStore((state) => state.setShowModal);
  const setAlert = useUisStore((state) => state.setAlert);
  
  const searchBook = useMutation({
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

  return searchBook
}
