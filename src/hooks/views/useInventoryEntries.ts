import { FormEvent } from "react";
import { formValidator } from "@/helpers";
import {  
  useEmployeesStore,
  useFormStore,
  useUIStore,
} from "@/stores";
import { useForm } from "../useForm";
import { CONST_FORM_ORDER, TRANSACTION_VALIDATION_SCHEMA } from "@/constants";

import { FormOptions } from "@/stores/interfaces.store";

interface ItemsOrder {
  item: number;
  isbn: string;
  title: string;
  editorial: string;
  quantity: number;
  authors: string;
  size: string;
  productType: string;
  nit: string;
  provider: string;
  observations: string;
  typeEntry: string;
}

const itemsOrder: ItemsOrder = {
  item: 1,
  isbn: "",
  title: "",
  quantity: 1,
  authors: "",
  editorial: "",
  size: "",
  productType: "",
  nit: "",
  provider: "",
  observations: "",
  typeEntry: "",
};

export const useInventoryEntries = () => {
  const { handleFieldChange } = useForm(itemsOrder);

  const formState = useFormStore<ItemsOrder>((state) => state.formState);
  const handleBlur = useFormStore((state) => state.handleBlur);
  const isTouched = useFormStore((state) => state.isTouched);

  const formItems = useUIStore((state) => state.formItems);
  const disabled = useUIStore((state) => state.disabled);

  const session = useEmployeesStore((state) => state.session);

  const errors = formValidator().getErrors(
    formState,
    TRANSACTION_VALIDATION_SCHEMA.newOrder
  );

  const { nit, productType, provider, observations, ...mainForm } = formState;

  const setNewFieldsForm = (): {
    titles: string[];
    nameTableFields: string[];
    formTable: FormOptions[];
  } => {
    switch (formState.productType) {
      case "book":
        return {
          titles: ["código", "Nombre", "Autor", "Editorial", "Cantidad"],
          nameTableFields: ["isbn", "title", "authors", "editorial", "quantity"],
          formTable: [
            ...CONST_FORM_ORDER.baseForm,
            ...CONST_FORM_ORDER.bookForm,
          ],
        };
      case "fashion":
        return {
          titles: ["código", "Nombre", "Talla", "Cantidad"],
          nameTableFields: ["isbn", "title", "size", "quantity"],
          formTable: [
            ...CONST_FORM_ORDER.baseForm,
            ...CONST_FORM_ORDER.fashionForm,
          ],
        };
      case "stationery" || "toy":
        return {
          titles: ["código", "Nombre", "Cantidad"],
          nameTableFields: ["isbn", "title", "quantity"],
          formTable: [...CONST_FORM_ORDER.baseForm, ...CONST_FORM_ORDER.others],
        };
      default:
        return {
          titles: ["código", "Nombre"],
          nameTableFields: ["isbn", "title"],
          formTable: [...CONST_FORM_ORDER.baseForm],
        };
    }
  };

  const handleCreateOrder = (e: FormEvent) => {
    e.preventDefault();

    const newItems = formItems.map(({ item, _id, ...rest }) => rest);

    const newPurchaseOrder = {
      nit,
      productType,
      provider,
      observations,
      newItems: [...newItems],
      employee: session?._id,
    };
    console.log(newPurchaseOrder);
  };

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
  };
};
