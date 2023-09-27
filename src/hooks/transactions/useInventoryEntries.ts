import { CONST_FORM_ORDER, TRANSACTION_VALIDATION_SCHEMA } from "@/constants";
import { formValidator } from "@/helpers";
import { formOptions, useEmployeesStore, useFormStore, useUITransactionStore } from "@/store";
import { FormEvent } from "react";
import { useForm } from "../useForm";


interface ItemsOrder {
  item: number,
  code: string,
  name: string,
  quantity: number,
  author: string,
  size: string,
  productType: string,
  nit: string,
  provider: string,
  observations: string,
  typeEntry: string,
}

const itemsOrder: ItemsOrder = {
  item: 1,
  code: '',
  name: '',
  quantity: 1,
  author: '',
  size: '',
  productType: '',
  nit: '',
  provider: '',
  observations: '',
  typeEntry:'',
}

export const useInventoryEntries = () => {
  const { handleFieldChange } = useForm(itemsOrder);

  const formState = useFormStore<ItemsOrder>(state => state.formState);
  const handleBlur = useFormStore(state => state.handleBlur);
  const isTouched = useFormStore(state => state.isTouched);

  const formItems = useUITransactionStore(state => state.formItems);
  const disabled = useUITransactionStore(state => state.disabled);

  const session = useEmployeesStore(state => state.session);

  const errors = formValidator().getErrors(formState, TRANSACTION_VALIDATION_SCHEMA.newOrder)

  const { nit, productType, provider, observations, ...mainForm } = formState;

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

  const handleCreateOrder = (e: FormEvent) => {
    e.preventDefault();

    const newItems = formItems.map(({ item, _id, ...rest }) => rest);

    const newPurchaseOrder = {
      nit,
      productType,
      provider,
      observations,
      newItems: [...newItems],
      employee: session?._id
    }
    console.log(newPurchaseOrder);
  }

  return {
    formState,
    isTouched,
    disabled,
    errors,
    mainForm,
    itemsOrder,
    handleFieldChange,
    handleBlur,
    handleCreateOrder,
    setNewFieldsForm,
  }
}