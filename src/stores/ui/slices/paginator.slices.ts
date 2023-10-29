import { StateCreator } from "zustand";
import { PaginatorSlice } from "@/stores/interfaces.store";

export const createPaginatorSlice: StateCreator<
  PaginatorSlice,
  [["zustand/devtools", unknown]]
> = (set) => ({
  page: 1,
  nextPage: () => {
    set((state) => ({ page: state.page + 1 }), false, "page");
  },
  prevPage: () => {
    set(
      (state) => ({
        page: state.page > 1 ? state.page - 1 : state.page,
      }),
      false,
      "page"
    );
  },
  resetPage: () => {
    set({ page: 1 }, false, "page");
  },
});
