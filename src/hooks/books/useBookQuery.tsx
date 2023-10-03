import { useQuery } from "@tanstack/react-query";

import { useBooksStore, useUisStore } from "@/store";

import { apiBook } from "@/api";

export function useBookQuery() {
  const setAllBooks = useBooksStore((state) => state.setAllBooks);
  const page = useUisStore((state) => state.page);
  const setAllCategories = useBooksStore((state) => state.setAllCategories);

  const getBooksQuery = useQuery({
    queryKey: ["books", { page }],

    queryFn: async () => {
      const data = await apiBook.getBooks(page);
      setAllBooks(data?.books || []);

      return data;
    },
    staleTime: Infinity,
  });

  const getCategoriesQuery = useQuery({
    queryKey: ["categories"],

    queryFn: async () => {
      const categories = await apiBook.getCategories();
      setAllCategories(categories);

      return categories;
    },
    staleTime: Infinity,
  });

  return {
    getBooksQuery,
    getCategoriesQuery,
  };
}
