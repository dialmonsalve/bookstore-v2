import { formValidator } from "../helpers/formValidator";

export const NEW_BOOK = {
  formFields: [
    {
      _id: 1,
      name: "isbn",
      type: "text",
      label: "ISBN",
    },
    {
      _id: 2,
      name: "title",
      type: "text",
      label: "título",
    },
    {
      _id: 3,
      name: "slug",
      type: "text",
      label: "slug",
    },
    {
      _id: 4,
      name: "authors",
      type: "text",
      label: "Autores",
    },
    {
      _id: 5,
      name: "editorial",
      type: "text",
      label: "Editorial",
    },
    {
      _id: 6,
      name: "publishedDate",
      type: "text",
      label: "publicación",
    },
    {
      _id: 7,
      name: "pageCount",
      type: "number",
      label: "páginas",
    },
    {
      _id: 8,
      name: "language",
      type: "text",
      label: "Idioma",
    },
  
    {
      _id: 9,
      name: "format",
      type: "text",
      label: "Formato",
    },
    {
      _id: 10,
      name: "cost",
      type: "number",
      label: "costo",
    },
    {
      _id: 11,
      name: "utility",
      type: "number",
      label: "Utilidad",
    },
    {
      _id: 12,
      name: "price",
      type: "number",
      label: "Precio",
    },
    {
      _id: 13,
      name: "discount",
      type: "number",
      label: "descuento",
    },
  ],
  initialForm: {
    authors: "",
    categories: null,
    cost: 0,
    description: "",
    discount: 0,
    editorial: "",
    format: "",
    imageLinks: "",
    isbn: "",
    language: "",
    pageCount: 0,
    price: 0,
    publishedDate: "",
    slug: "",
    tags: [],
    title: "",
    utility: 0,
  }
} 

export const BOOK_VALIDATION_SCHEMA = {
  newBook: {
    isbn: formValidator()
      .string()
      .required("Campo ISBN es requerido")
      .min(3, "El ISBN debe tener al menos de 3 caracteres"),
    title: formValidator()
      .string()
      .required("Campo título es requerido")
      .min(3, "El nombre debe tener al menos de 3 caracteres"),
    slug: formValidator()
      .string()
      .required("Campo slug es requerido")
      .min(3, "El slug debe tener al menos de 3 caracteres"),
    authors: formValidator()
      .required("Campo autor(es) es requerido"),
    price: formValidator()
      .zero("El precio debe ser igual o mayor a cero"),
    discount: formValidator()
      .zero("El descuento debe ser igual o mayor a cero"),
    cost: formValidator()
      .zero("El costo debe ser igual o mayor a cero"),
    utility: formValidator()
      .zero("La utilidad debe ser igual o mayor a cero"),
    pageCount: formValidator()
      .zero("La cantidad de páginas debe ser igual o mayor a cero"),
    categories: formValidator().required(
      "El libro debe tener por lo menos una categoría"
    ),
    tags: formValidator().required("Debe tener al menos un tag"),
  },
  options: ["juvenil", "drama", "deportes"],
};

//       values: ['eBook', 'audioBook', 'printedBook', 'PDF', 'EPUB', 'MOBI'],