export interface IClient {
  id?: string;
  name: string;
  lastName: string;
  email: string;
  password?: string;
  phone: string;
  createdAt?: number;
  updatedAt?: number;
  isAvailable?: boolean;
}

export interface IUser {
  id?: string;
  name: string;
  lastName: string;
  email: string;
  password?: string;
  phone?: string;
  createdAt?: number;
  updatedAt?: number;
  isAvailable?: boolean;
  role: TypeRole[];
}

type TypeRole = 'admin' | 'logistica' | 'vendedor' | 'compras';