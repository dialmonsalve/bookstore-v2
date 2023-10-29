import { transactions } from "@/api";
import { useUIStore } from "@/stores";
import { IPurchaseOrder } from "@/types/order";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";

export function useCreatePurchaseOrder() {
  const queryClient = useQueryClient();
  const setAlert = useUIStore((state) => state.setAlert);
  const router = useRouter()

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
      router.push('/bookstore/logistic/purchase-orders')
      setAlert("success", true, "La orden de compra se ha creado con éxito");
    },
    onError: (error: any) => {
      setAlert("error", true, error.message!);
    },
  });
}
