interface IUser {
  _id?: string;
  createdAt?: number;
  deleted?: boolean;
  isAvailable?: boolean;
  lastName: string;
  name: string;
  password: string;
  updatedAt?: number;
}

export interface IClient extends IUser {
  isAccountValidated?: boolean
  phone: string;
  email: string;
}

export interface IStaff extends IUser {
  role: TypeRole[];
  phone?: string;
  isNew?: boolean;
  username: string;
  email?: string;
}

type TypeRole = 'admin' | 'logistica' | 'vendedor' | 'compras';