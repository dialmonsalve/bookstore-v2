import { AlertSlice, ModalSlice } from "@/stores/interfaces.store";
import { IPurchaseOrder } from "@/types/order";
import { NextRouter } from "next/router";

export interface CreatePurchaseOrder {
  createPurchaseOrder:(
    purchaseOrder: IPurchaseOrder,
    username?: string
  ) => Promise<IPurchaseOrder | null>
  useUIStore: UIStore
  useRouter(): NextRouter;
}
interface UIStore {
  <T>(selector: (state: AlertSlice & ModalSlice) => T): T;
}