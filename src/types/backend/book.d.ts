export interface IBook {
  _id?: string;
  authors: string[];
  categories: string[] | undefined;
  cost?: number;
  createdAt?: string;
  createdFor?: string;
  discount?: number;
  editorial: string | undefined;
  format?: TypeFormat;
  imageLinks?: string;
  isAvailable?: boolean;
  isbn: string;
  language?: string;
  title: string;
  pageCount?: number;
  price?: number;
  publishedDate?: string;
  ratings?: string;
  review?: string;
  stock?: number;
  description?: string;
  updatedAt?: string;
  updatedFor?: string;
  utility?: number;
  slug?: string;
  tags?: string[];
}

interface IAuthor {
  _id?: string;
  biography: ?string;
  birth?: string;
  createdAt?: string;
  createdFor?: string;
  isAvailable?: boolean;
  fullName: string;
  nationality?: string;
  updatedAt?: string;
  updatedFor?: string;
  web?: string;
}

interface ICategory {
  _id?: string;
  createdAt?: string;
  createdFor?: string;
  isAvailable?: boolean;
  name: string;
  updatedAt?: string;
  updatedFor?: string;
}

interface IEditorial {
  _id?: string;
  address?: string;
  country?: string;
  createdAt?: string;
  createdFor?: string;
  email?: string;
  isAvailable?: boolean;
  phone?: string;
  updatedAt?: string;
  updatedFor?: string;
  web?: string;
  distributor: string;
  name: string;
  nit: string;
}

interface IDistributor {
  _id?: string;
  address?: string;
  country?: string;
  createdAt?: string;
  createdFor?: string;
  email?: string;
  isAvailable?: boolean;
  phone?: string;
  updatedAt?: string;
  updatedFor?: string;
  web: string;
  name: string;
  nit: string;
}

type TypeFormat =
  | ""
  | "eBook"
  | "audioBook"
  | "printedBook"
  | "PDF"
  | "EPUB"
  | "MOBI";
