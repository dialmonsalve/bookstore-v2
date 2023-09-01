export interface IFBook {
  id?: string;
  author: Array<IAuthor | undefined>;
  category: Array<ICategory | undefined>;
  createdAt?: string;
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
  slug: string;
  tags?: string[]
}

interface IFAuthor {
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

interface IFCategory {
  id?: string;
  createdAt?: string;
  createdFor: IUser;
  isAvailable?: boolean;
  name: string;
  updatedAt?: string;
  updatedFor: IUser;
}

interface IFEditorial {
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

interface IFDistributor {
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

type TypeFFormat =
  | 'eBook' | 'audioBook' | 'printedBook' | 'PDF' | 'EPUB' | 'MOBI'

