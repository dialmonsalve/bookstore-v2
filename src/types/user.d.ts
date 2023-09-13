interface IUser {
  _id?: string;
  createdAt?: number;
  deleted?: boolean;
  isAvailable?: boolean;
  lastName?: string;
  name?: string;
  password: string;
  updatedAt?: number;
  phone?: string;
  image?: string
  repitePassword?: string
}

export interface IClient extends IUser {
  isAccountValidated?: boolean
  email: string;
}

export interface IEmployee extends IUser {
  role?: TypeRole[];
  isNewEmployee?: boolean;
  username: string;
  email?: string;
}

type TypeRole = | "admin" | "logistica" | "vendedor" | "compras"


interface ResponseObject {
  _id?: string,
  email?: string,
  name?: string,
  image?: string,
  lastName?: string,
  phone?: string,
  role?: TypeRole[],
  username?: string
}