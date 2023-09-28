import { useQuery } from "@tanstack/react-query";

import { getCategories } from "@/api/books";

import { useBooksStore } from "@/store";

export function useCategories() {
  const setCategories = useBooksStore((state) => state.setCategories);


  const queryCategories = useQuery(
    ["categories" ],
    async () => {
      const data = await getCategories();
      setCategories(data?.categories!);

      return data;
    },
    {
      // staleTime: Infinity,
      // initialData: Categories,
    }
  );

  return queryCategories;
}
