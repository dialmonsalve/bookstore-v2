import { transactions } from "@/api";
import { useUisStore } from "@/store";
import { IPurchaseOrder } from "@/types/order";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreatePurchaseOrder() {
  const queryClient = useQueryClient();
  const setAlert = useUisStore((state) => state.setAlert);
  return useMutation({
    mutationFn: ({
      purchaseOrder,
      username,
    }: {
      purchaseOrder: IPurchaseOrder;
      username?: string;
    }) => transactions.createPurchaseOrder(purchaseOrder, username),
    onSuccess: (purchaseOrder) => {
      queryClient.setQueriesData(["purchaseOrder"], purchaseOrder);
      queryClient.invalidateQueries(["purchaseOrder"]);
      setAlert("success", true, "La orden de compra se ha creado con éxito");
    },
    onError: (error: any) => {
      setAlert("error", true, error.message!);
    },
  });
}
