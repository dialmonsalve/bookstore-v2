import { CONST_FORM_ORDER, TRANSACTION_VALIDATION_SCHEMA } from "@/constants";
import { formValidator } from "@/helpers";
import {
  
  useBooksStore,
  useEmployeesStore,
  useFormStore,
  useUIStore,
} from "@/stores";

import { useForm } from "../useForm";
import { useRouter } from "next/router";

import { useCreatePurchaseOrder } from "../transactions";
import { FormOptions } from "@/stores/interfaces.store";
import { useGetBookByISBN } from "@/plugins/dependencies/bookDependency";

interface ItemsOrder {
  item: number;
  isbn: string;
  title: string;
  quantity: number;
  authors: string[];
  editorial: string;
  size: string;
  productType: string;
  nit: string;
  provider: string;
  observations: string;
}

const itemsOrder: ItemsOrder = {
  item: 1,
  isbn: "",
  title: "",
  quantity: 1,
  authors: [],
  editorial: "",
  size: "",
  productType: "",
  nit: "",
  provider: "",
  observations: "",
};

export const usePurchaseOrders = () => {
  const router = useRouter();
  const { handleFieldChange } = useForm(itemsOrder);

  const formState = useFormStore<ItemsOrder>((state) => state.formState);
  const isTouched = useFormStore((state) => state.isTouched);
  const handleBlur = useFormStore((state) => state.handleBlur);
  const handleResetForm = useFormStore((state) => state.handleResetForm);

  const formItems = useUIStore((state) => state.formItems);
  const disabled = useUIStore((state) => state.disabled);
  const clearItems = useUIStore((state) => state.clearItems);

  const createPurchaseOrder = useCreatePurchaseOrder();

  const book = useBooksStore((state) => state.book);

  const session = useEmployeesStore((state) => state.session);

  const getBookByISBN = useGetBookByISBN();

  const setShowModal = useUIStore((state) => state.setShowModal);

  const errors = formValidator().getErrors(
    formState,
    TRANSACTION_VALIDATION_SCHEMA.newOrder
  );

  const setNewFieldsForm = (): {
    titles: string[];
    nameTableFields: string[];
    formTable: FormOptions[];
  } => {
    switch (formState.productType) {
      case "Book":
        return {
          titles: ["código", "Nombre", "Autor", "Editorial", "Cantidad"],
          nameTableFields: [
            "isbn",
            "title",
            "authors",
            "editorial",
            "quantity",
          ],
          formTable: [
            ...CONST_FORM_ORDER.baseForm,
            ...CONST_FORM_ORDER.bookForm,
          ],
        };
      case "Fashion":
        return {
          titles: ["código", "Nombre", "Talla", "Cantidad"],
          nameTableFields: ["code", "title", "size", "quantity"],
          formTable: [
            ...CONST_FORM_ORDER.baseForm,
            ...CONST_FORM_ORDER.fashionForm,
          ],
        };
      case "Stationery" || "Toy":
        return {
          titles: ["código", "Nombre", "Cantidad"],
          nameTableFields: ["code", "title", "quantity"],
          formTable: [...CONST_FORM_ORDER.baseForm, ...CONST_FORM_ORDER.others],
        };
      default:
        return {
          titles: ["código", "Nombre"],
          nameTableFields: ["code", "title"],
          formTable: [...CONST_FORM_ORDER.baseForm],
        };
    }
  };

  return {
    book,
    createPurchaseOrder,
    disabled,
    errors,
    formItems,
    formState,
    getBookByISBN,
    isTouched,
    itemsOrder,
    router,
    session,
    setShowModal,
    handleFieldChange,
    handleBlur,
    handleResetForm,
    clearItems,
    setNewFieldsForm,
  };
};
