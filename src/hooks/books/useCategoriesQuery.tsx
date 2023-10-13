import { useQuery } from "@tanstack/react-query";

import { useBooksStore } from "@/store";

import { apiBook } from "@/api";

export function useCategoriesQuery() {
  const setAllCategories = useBooksStore((state) => state.setAllCategories);

  const getCategories = useQuery({
    queryKey: ["categories"],

    queryFn: async () => {
      const categories = await apiBook.getCategories();
      setAllCategories(categories);

      return categories;
    },
    staleTime: Infinity,
  });

  return getCategories;
}
