import { useQuery } from "@tanstack/react-query";

import { useBooksStore, useUisStore } from "@/store";

import { apiBook } from "@/api";

export function useBookQuery() {
  const setAllBooks = useBooksStore((state) => state.setAllBooks);
  const page = useUisStore((state) => state.page);

  const getBooks = useQuery({
    queryKey: ["books", { page }],

    queryFn: async () => {
      const data = await apiBook.getBooks(page);
      setAllBooks(data?.books || []);

      return data;
    },
    staleTime: 60 * 60 * 24,
  });

  return getBooks;
}
