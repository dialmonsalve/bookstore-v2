import { getSearchBooks } from "@/api/books"
import { useBooksStore, useUisStore } from "@/store";
import { useMutation, useQueryClient, } from "@tanstack/react-query"

export function useSearchBook() {

  const setShowModal = useUisStore(state => state.setShowModal)
  const queryClient = useQueryClient();

  const searchBook = useMutation(
    (term: string) => getSearchBooks(term),
    {
      onSuccess(books, variables, context) {
        queryClient.setQueriesData(["search-books"], books)

        useBooksStore.getState().setFindBooks(books)
        setShowModal(true)
      },
    }
  )
  return searchBook
}
