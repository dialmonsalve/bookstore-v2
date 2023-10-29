import { useQuery } from "@tanstack/react-query";

import { GetCategoriesBook } from "../../interfaces/tanstak-query.books";

export function useQueryGetCategoriesBook({
  useBooksStore,
  getCategories,
}: GetCategoriesBook) {
  const setAllCategories = useBooksStore((state) => state.setAllCategories);

  return useQuery({
    queryKey: ["categories"],

    queryFn: async () => {
      const categories = await getCategories();
      setAllCategories(categories);

      return categories;
    },
    staleTime: Infinity,
  });
}
