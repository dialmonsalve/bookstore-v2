import { IClient } from ".";

interface IPurchaseOrder {
  nit?: string;
  productType: string;
  provider: string;
  observations?: string;
  consecutive?: number;
  status?: "open" | "close" | "annulled";
  createAt?: string;
  updateAt?: string;
  items: IOrderItem[];
  createdFor?: IUser;
  updatedFor?: IUser;
}
export interface IOrderItem {
  _id: string;
  isbn: string;
  title?: string;
  quantity: number;
  authors?: string;
  editorial?: string;
  size?: string;
}
