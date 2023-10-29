import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { createPaginatorSlice } from "./slices/paginator.slices";
import { createModalSlice } from "./slices/modal.slice";
import { createAlertSlice } from "./slices/alert.slice";
import { createSidebarSlice } from "./slices/sidebar.slice";
import { createTableItemsSlice } from "./slices/tableItems.slice";

import {
  AlertSlice,
  SidebarSlice,
  ModalSlice,
  PaginatorSlice,
  TableItemsSlice,
} from "../interfaces.store";

type UISlices = SidebarSlice &
  AlertSlice &
  ModalSlice &
  PaginatorSlice &
  TableItemsSlice<any>;

export const useUIStore = create<UISlices>()(
  devtools(
    (set, get, fn) => ({
      ...createPaginatorSlice(set, get, fn),
      ...createModalSlice(set, get, fn),
      ...createAlertSlice(set, get, fn),
      ...createSidebarSlice(set, get, fn),
      ...createTableItemsSlice(set, get, fn),
    }),
    { name: "User Interface" }
  )
);
