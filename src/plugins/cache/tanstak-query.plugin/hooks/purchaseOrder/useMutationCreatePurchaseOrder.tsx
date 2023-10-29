import { useMutation, useQueryClient } from "@tanstack/react-query";

import { IPurchaseOrder } from "@/types/order";
import { CreatePurchaseOrder } from "../../interfaces/tanstak-query.purchase-order";

export function useMutationCreatePurchaseOrder(
  purchaseOrderAction: CreatePurchaseOrder
) {
  const { createPurchaseOrder, useUIStore, useRouter } = purchaseOrderAction;

  const queryClient = useQueryClient();
  const setAlert = useUIStore((state) => state.setAlert);
  const router = useRouter();

  return useMutation({
    mutationFn: ({
      purchaseOrder,
      username,
    }: {
      purchaseOrder: IPurchaseOrder;
      username?: string;
    }) => createPurchaseOrder(purchaseOrder, username),
    onSuccess: (purchaseOrder) => {
      queryClient.setQueriesData(["purchaseOrder"], purchaseOrder);
      queryClient.invalidateQueries(["purchaseOrder"]);
      router.push("/bookstore/logistic/purchase-orders");
      setAlert("success", true, "La orden de compra se ha creado con éxito");
    },
    onError: (error: any) => {
      setAlert("error", true, error.message!);
    },
  });
}
