import { useQuery } from "@tanstack/react-query";

import { getBooks } from "@/api/books";

import { useUisStore } from "@/store/ui";
import { useBooksStore } from "@/store";

export function useBooks() {

  const setBooks = useBooksStore(state => state.setBooks)


  const page = useUisStore(state => state.page)

  const queryBooks = useQuery(
    ["books", { page }],
    async () => {
      const data = await getBooks(page)
      setBooks(data?.books!)

      return data
    }
    , {
      // staleTime: Infinity,
      // initialData: Books,  
    }
  )

  return queryBooks
}