import { formValidator } from "@/helpers"

export const CONST_PURCHASE_ORDER = {

  nitOrder: [
    {
      _id: 0,
      label: 'Nit',
      type: 'text',
      name: 'nit',
    },
    {
      _id: 1,
      label: 'Proveedor',
      type: 'text',
      name: 'provider',
    },

  ],
  baseForm: [
    {
      _id: 2,
      label: 'código',
      type: 'text',
      name: 'code',
    },
    {
      _id: 3,
      label: 'Nombre',
      type: 'text',
      name: 'name',
    },
    {
      _id: 5,
      label: 'Cantidad',
      type: 'number',
      name: 'quantity',
    },
  ],
  bookForm: [
    {
      _id: 4,
      label: 'Autor',
      type: 'text',
      name: 'author',
    },
  ],
  fashionForm: [
    {
      _id: 6,
      label: 'Talla',
      type: 'text',
      name: 'size',
    },
  ]
}

export const TRANSACTION_VALIDATION_SCHEMA = {
  newOrder: {
    code: formValidator()
    .string()
    .required('Campo código es requerido')
    .min(3, 'El nombre debe tener al menos de 3 caracteres'),
    quantity: formValidator()
    .number()
    .required('Campo código es requerido')
    .positiveNumber('La cantidad debe ser mayor a 1'),
    provider: formValidator()
      .string()
      .required('Campo proveedor es requerido')
      .min(3, 'El nombre debe tener al menos de 3 caracteres'),
    productType: formValidator()
      .string()
      .required('Campo producto es requerido')
  }
}