import { CONST_FORM_ORDER, TRANSACTION_VALIDATION_SCHEMA } from "@/constants";
import { formValidator } from "@/helpers";
import {
  FormOptions,
  useBooksStore,
  useEmployeesStore,
  useFormStore,
  useUITransactionStore,
  useUisStore,
} from "@/store";

import { useForm } from "../useForm";
import { useCreatePurchaseOrder } from ".";
import { useRouter } from "next/router";
import { useBookMutation } from "../books";

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
  const handleResetForm = useFormStore(state => state.handleResetForm)

  const formItems = useUITransactionStore((state) => state.formItems);
  const disabled = useUITransactionStore((state) => state.disabled);
  const clearAllItems = useUITransactionStore((state) => state.clearAllItems);

  const createPurchaseOrder = useCreatePurchaseOrder();

  const book = useBooksStore((state) => state.book);

  const session = useEmployeesStore((state) => state.session);

  const {getBookByISBNMutation} = useBookMutation();

  const setShowModal = useUisStore((state) => state.setShowModal);

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
    getBookByISBNMutation,
    isTouched,
    itemsOrder,
    router,
    session,
    setShowModal,
    handleFieldChange,
    handleBlur,
    handleResetForm,
    clearAllItems,
    setNewFieldsForm,
  };
};
