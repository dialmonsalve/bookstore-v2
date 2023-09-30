import { useQuery } from "@tanstack/react-query";

import { useBooksStore, useUisStore } from "@/store";

import { apiBook } from "@/api";

export function useBooks() {
  const setBooks = useBooksStore((state) => state.setBooks);
  const page = useUisStore((state) => state.page);

  return useQuery({
    queryKey: ["books", { page }],

    queryFn: async () => {
      const data = await apiBook.getBooks(page);
      setBooks(data?.books!);
      
      return data;
    },
  });
}
