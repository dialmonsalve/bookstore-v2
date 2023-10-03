import { IPurchaseOrder } from "@/types/order";
import { transactionApi } from ".";

export async function createPurchaseOrder(
  purchaseOrder: IPurchaseOrder,
  username?: string
): Promise<IPurchaseOrder | null> {
  if (!username) {
    throw new Error("Usuario no autorizado para esta acción");
  }

  try {
    const { data } = await transactionApi.post<IPurchaseOrder>(
      "/purchase-order",
      { purchaseOrder, username }
    );

    return data;
  } catch (error: any) {
    throw new Error(error.response?.data.message);
  }
}
