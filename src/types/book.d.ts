export interface IBook {
  author: Array<IAuthor | undefined>;
  category: Array<ICategory | undefined>;
  createdAt: Date;
  createdFor: IUser;
  discount: number;
  editorial: IEditorial;
  format: TypeFormat;
  imageLinks: string;
  isAvailable: boolean;
  isbn: string;
  language: string;
  name: string;
  pageCount: number;
  price: number;
  publishedDate: string;
  ratings: string;
  review: string;
  stock: number;
  summary: string;
  updatedAt: Date;
  updatedFor: IUser;
}

interface IAuthor {
  biography: string
  birth: string
  createdAt: Date;
  createdFor: IUser;
  isAvailable: boolean;
  lastName: string
  name: string
  nationality: string
  updatedAt: Date;
  updatedFor: IUser;
  web: string
}

interface ICategory {
  createdAt: Date;
  createdFor: IUser;
  isAvailable: boolean;
  name: string;
  updatedAt: Date;
  updatedFor: IUser;
}

interface IEditorial {
  address: string
  country: string
  createdAt: Date;
  createdFor: IUser;
  distributor: IDistributor
  email: string
  isAvailable: boolean;
  name: string
  nit: string
  phone: string
  updatedAt: Date;
  updatedFor: IUser;
  web: string
}

interface IDistributor {
  address: string
  country: string
  createdAt: Date;
  createdFor: IUser;
  email: string
  isAvailable: boolean;
  name: string
  nit: string
  phone: string
  updatedAt: Date;
  updatedFor: IUser;
  web: string
}

type TypeFormat =
  | 'eBook' | 'audioBook' | 'printedBook' | 'PDF' | 'EPUB' | 'MOBI'

