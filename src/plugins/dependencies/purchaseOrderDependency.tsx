import { useRouter } from "next/router";
import { usePurchaseOrderOperations } from "../cache/tanstak-query.plugin/entities/usePurchaseOrderOperations";
import { httpPurchaseOrderPlugin } from "../http/axios.plugin/entities/httpPurchaseOrderPlugin";
import { useUIStore } from "@/stores";

export const useCreatePurchaseOrder = () =>
  usePurchaseOrderOperations().mutationCreate({
    useRouter,
    createPurchaseOrder: httpPurchaseOrderPlugin().create,
    useUIStore,
  });
