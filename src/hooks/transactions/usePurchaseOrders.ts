import { CONST_FORM_ORDER, TRANSACTION_VALIDATION_SCHEMA } from "@/constants";
import { formValidator } from "@/helpers";
import { formOptions, useFormStore, useUITransactionStore } from "@/store";

import { useForm } from "../useForm";

interface ItemsOrder {
  item: number,
  code: string,
  name: string,
  quantity: number,
  author: string,
  editorial: string,
  size: string,
  productType: string,
  nit: string,
  provider: string,
  observations: string,
}

const itemsOrder: ItemsOrder = {
  item: 1,
  code: '',
  name: '',
  quantity: 1,
  author: '',
  editorial: '',
  size: '',
  productType: '',
  nit: '',
  provider: '',
  observations: '',
}

export const usePurchaseOrders = () => {
  const { handleFieldChange } = useForm(itemsOrder);

  const formState = useFormStore<ItemsOrder>(state => state.formState);
  const handleBlur = useFormStore(state => state.handleBlur);
  const isTouched = useFormStore(state => state.isTouched);

  const disabled = useUITransactionStore(state => state.disabled);

  const errors = formValidator().getErrors(formState, TRANSACTION_VALIDATION_SCHEMA.newOrder);


  const setNewFieldsForm = ():{titles:string[],nameTableFields:string[], formTable:formOptions[] } => {
    
    switch (formState.productType) {
      case 'book':
        return {
          titles: ['código', 'Nombre', 'Autor', 'Editorial', 'Cantidad'],
          nameTableFields: ['code', 'name', 'author', 'editorial', 'quantity'],
          formTable: [...CONST_FORM_ORDER.baseForm, ...CONST_FORM_ORDER.bookForm]
        };
      case 'fashion':
        return {
          titles: ['código', 'Nombre', 'Talla', 'Cantidad'],
          nameTableFields: ['code', 'name', 'size', 'quantity'],
          formTable: [...CONST_FORM_ORDER.baseForm, ...CONST_FORM_ORDER.fashionForm]
        };
      case 'stationery' || 'toy':
        return {
          titles: ['código', 'Nombre', 'Cantidad'],
          nameTableFields: ['code', 'name', 'quantity'],
          formTable: [...CONST_FORM_ORDER.baseForm, ...CONST_FORM_ORDER.others]
        };
      default:
        return {
          titles: ['código', 'Nombre'],
          nameTableFields: ['code', 'name'],
          formTable: [...CONST_FORM_ORDER.baseForm]
        };
    }
  }

  return {
    formState,
    isTouched,
    disabled,
    errors,
    itemsOrder,
    handleFieldChange,
    handleBlur,
    setNewFieldsForm
  }
}