export interface IBook {
  id?: string;
  author: Array<IAuthor | undefined>;
  category: Array<ICategory | undefined>;
  createdAt?: nstring;
  createdFor?: IUser;
  discount?: number;
  editorial: IEditorial;
  format: TypeFormat;
  imageLinks?: string;
  isAvailable?: boolean;
  isbn: string;
  language?: string;
  name: string;
  pageCount?: number;
  price: number;
  publishedDate?: string;
  ratings?: string;
  review?: string;
  stock: number;
  summary?: string;
  updatedAt?: string;
  updatedFor?: IUser;
}

interface IAuthor {
  id?: string;
  biography: ?string
  birth?: string
  createdAt?: string;
  createdFor: IUser;
  isAvailable?: boolean;
  fullName: string
  nationality?: string
  updatedAt?: string;
  updatedFor: IUser;
  web?: string
}

interface ICategory {
  id?: string;
  createdAt?: string;
  createdFor: IUser;
  isAvailable?: boolean;
  name: string;
  updatedAt?: string;
  updatedFor: IUser;
}

interface IEditorial {
  id?: string;
  address?: string;
  country?: string;
  createdAt?: string;
  createdFor?: IUser;
  email?: string;
  isAvailable?: boolean;
  phone?: string;
  updatedAt?: string;
  updatedFor?: IUser;
  web?: string;
  distributor: IDistributor
  name: string;
  nit: string;
}

interface IDistributor {
  id?: string;
  address?: string;
  country?: string;
  createdAt?: string;
  createdFor?: IUser;
  email?: string;
  isAvailable?: boolean;
  phone?: string;
  updatedAt?: string;
  updatedFor?: IUser;
  web: string;
  name: string;
  nit: string;
}

type TypeFormat =
  | 'eBook' | 'audioBook' | 'printedBook' | 'PDF' | 'EPUB' | 'MOBI'

