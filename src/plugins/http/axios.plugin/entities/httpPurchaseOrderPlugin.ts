import axios from "axios";
import { IPurchaseOrder } from "@/types/order";

export const httpPurchaseOrderPlugin = () => {
  const purchaseOrderApi = axios.create({
    baseURL: "http://localhost:3000/api/transactions",
  });

  async function create(
    purchaseOrder: IPurchaseOrder,
    username?: string
  ): Promise<IPurchaseOrder | null> {
    if (!username) {
      throw new Error("Usuario no autorizado para esta acción");
    }
    try {
      const { data } = await purchaseOrderApi.post<IPurchaseOrder>(
        "/purchase-order",
        { purchaseOrder, username }
      );
      return data;
    } catch (error: any) {
      throw new Error(error.response?.data.message);
    }
  }

  return {
    create,
  };
};
