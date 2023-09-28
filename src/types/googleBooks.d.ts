export interface GoogleBooks {
  items:      Item[];
}

export interface Item {
  id:          string
  volumeInfo:  VolumeInfo;
}

interface VolumeInfo {
  title:               string;
  authors:             string[];
  publisher?:          string;
  publishedDate:       string;
  description?:        string;
  industryIdentifiers: IndustryIdentifier[];
  pageCount:           number;
  categories?:         string[];
  imageLinks?:         ImageLinks;
  language:            string;
  subtitle?:           string;
}

interface ImageLinks {
  smallThumbnail: string;
}

interface IndustryIdentifier {
  type:       Type;
  identifier: string;
}

enum Type {
  Isbn13 = "ISBN_13",
}

export interface FoundBooks {
  id:         string
  isbn:          string;
  title:         string;
  authors:       string[];
  categories?:    string[];
  subtitle:      string;
  description:   string;
  editorial:     string;
  language:      string;
  pageCount:     number;
  publishedDate: string;
  format:        string;
  slug:          string;
  imageLinks:    string;
}
