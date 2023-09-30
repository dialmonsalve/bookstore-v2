import { formValidator } from "../helpers/formValidator";

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
    tags: formValidator().required("requerido"),
  },
  options: ["juvenil", "drama", "deportes"],
};

//       values: ['eBook', 'audioBook', 'printedBook', 'PDF', 'EPUB', 'MOBI'],
