import { useQuery } from "@tanstack/react-query";

import { apiBook } from "@/api";

import { useBooksStore } from "@/store";

export function useCategories() {
  const setCategories = useBooksStore((state) => state.setCategories);

  return useQuery({
    queryKey: ["categories"],

    queryFn: async () => {
      const data = await apiBook.getCategories();
      setCategories(data?.categories!);

      return data;
    },
  });
}
