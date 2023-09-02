interface IUser {
  _id?: string;
  createdAt?: number;
  deleted?: boolean;
  isAvailable?: boolean;
  lastName?: string;
  name: string;
  password: string;
  updatedAt?: number;
  phone?: string;
  image?:string
}

export interface IClient extends IUser {
  isAccountValidated?: boolean
  email: string;
}

export interface IStaff extends IUser {
  role: TypeRole[];
  isNewStaff?: boolean;
  username: string;
  email?: string;
}

type TypeRole = 'admin' | 'logistica' | 'vendedor' | 'compras';