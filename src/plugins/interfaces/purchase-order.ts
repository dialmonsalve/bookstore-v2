import { IPurchaseOrder } from "@/types/order";
import { NextRouter } from "next/router";
import { UIStore } from ".";

export interface CreatePurchaseOrder {
  createPurchaseOrder: (
    purchaseOrder: IPurchaseOrder,
    username?: string
  ) => Promise<IPurchaseOrder | null>;
  useUIStore: UIStore;
  useRouter(): NextRouter;
}
