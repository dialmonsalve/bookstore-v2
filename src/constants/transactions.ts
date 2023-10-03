import { formValidator } from "@/helpers"


export const CONST_FORM_ORDER = {
  infoProvider: [
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
      name: 'isbn',
    },
    {
      _id: 3,
      label: 'Nombre',
      type: 'text',
      name: 'title',
    },

  ],
  bookForm: [
    {
      _id: 4,
      label: 'Autor',
      type: 'text',
      name: 'authors',
    },
    {
      _id: 5,
      label: 'Editorial',
      type: 'text',
      name: 'editorial',
    },
    {
      _id: 7,
      label: 'Cantidad',
      type: 'number',
      name: 'quantity',
    },
  ],
  fashionForm: [
    {
      _id: 6,
      label: 'Talla',
      type: 'text',
      name: 'size',
    },
    {
      _id: 7,
      label: 'Cantidad',
      type: 'number',
      name: 'quantity',
    },
  ],
  others:[
    {
      _id: 7,
      label: 'Cantidad',
      type: 'number',
      name: 'quantity',
    },
  ]
}

export const INVENTORY_ENTRIES = {
  infoProvider: [
    {
      _id: 2,
      label: 'Número de orden',
      type: 'number',
      name: 'numberOrder',
    },
    ...CONST_FORM_ORDER.infoProvider,
  ],
  baseForm: CONST_FORM_ORDER.baseForm
}
export const TRANSACTION_VALIDATION_SCHEMA = {
  newOrder: {
    isbn: formValidator()
      .string()
      .required('Campo ISBN es requerido')
      .min(3, 'El nombre debe tener al menos de 3 caracteres'),
    quantity: formValidator()
      .number()
      .required('Campo cantidad es requerido')
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