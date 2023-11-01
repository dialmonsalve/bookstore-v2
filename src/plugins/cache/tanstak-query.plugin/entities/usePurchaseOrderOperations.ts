import { useMutationCreatePurchaseOrder } from "../hooks/purchaseOrder";
import { CreatePurchaseOrder } from "@/plugins/interfaces";

export const usePurchaseOrderOperations = () => {
  function mutationCreate(actionPurchaseOrder: CreatePurchaseOrder) {
    const createPurchaseOrder =
      useMutationCreatePurchaseOrder(actionPurchaseOrder);

    return {
      create: createPurchaseOrder.mutate,
      isCreateLoading: createPurchaseOrder.isLoading,
      isSuccess: createPurchaseOrder.isSuccess
    };
  }
  return {
    mutationCreate,
  };
};
