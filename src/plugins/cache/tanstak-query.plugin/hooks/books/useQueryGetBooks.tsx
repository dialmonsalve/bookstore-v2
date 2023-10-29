import { useQuery } from "@tanstack/react-query";

import { GetBooks } from "../../interfaces/tanstak-query.books";

export function useQueryGetBooks(bookActions: GetBooks) {
  const { useBooksStore, useUIStore, getBooks } = bookActions;
  const setAllBooks = useBooksStore((state) => state.setAllBooks);
  const page = useUIStore((state) => state.page);

  return useQuery({
    queryKey: ["books", { page }],

    queryFn: async () => {
      const data = await getBooks(page);
      setAllBooks(data?.books || []);

      return data;
    },
    staleTime: 60 * 60 * 24 * 1000,
  });
}
