import { StateCreator } from "zustand";
import { SidebarSlice } from "@/stores/interfaces.store";

export const createSidebarSlice: StateCreator<
  SidebarSlice,
  [["zustand/devtools", unknown]]
> = (set) => ({
  toggleSidebar: false,
  setToggleSidebar: () => {
    set(
      (state) => ({ toggleSidebar: !state.toggleSidebar }),
      false,
      "toggleSidebar"
    );
  },
});
