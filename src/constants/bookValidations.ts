import { formValidator } from '../helpers/formValidator';

export const BOOK_VALIDATION_SCHEMA = {

  newBook:{
    isbn:formValidator()
    .string()
    .required('Campo ISBN es requerido')
    .min(3, 'El ISBN debe tener al menos de 3 caracteres'),
    name:formValidator()
    .string()
    .required('Campo nombre es requerido')
    .min(3, 'El nombre debe tener al menos de 3 caracteres'),
    author1:formValidator()
    .string()
    .required('Campo autor es requerido')
    .min(3, 'El autor debe tener al menos de 3 caracteres'),
    price:formValidator()
    .number()
    .required('Campo precio es requerido')
    .zero('El precio debe ser igual o mayor a cero'),
    discount:formValidator()
    .number()
    .zero('El descuento debe ser igual o mayor a cero'),
    stock:formValidator()
    .number()
    .zero('La existencia debe ser igual o mayor a cero'),
    pageCount:formValidator()
    .number()
    .zero('La cantidad de páginas debe ser igual o mayor a cero'),
  },
  options: ['juvenil', 'drama', 'deportes'],
}

//       values: ['eBook', 'audioBook', 'printedBook', 'PDF', 'EPUB', 'MOBI'],
