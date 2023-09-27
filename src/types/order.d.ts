import { IClient } from ".";

interface IOrderPurchase {
  nit?: string,
  productType: string,
  provider: string,
  observations?: string,
  employee: objectId | string,
  consecutive: number
  status: 'abierta' | 'cerrada' | 'anulada'
  createAt: string
  updateAt: string
  items: IOrderItem[]
}
export interface IOrderItem {
  _id: string;
  isbn: string,
  name?: string,
  quantity: number,
  author?: string,
  editorial?: string,
  size?: string,
}