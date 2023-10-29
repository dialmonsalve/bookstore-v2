import { TableItemsSlice } from "@/stores/interfaces.store";
import { StateCreator } from "zustand";

export const createTableItemsSlice: StateCreator<
  TableItemsSlice<any>,
  [["zustand/devtools", unknown]]
> = (set, get) => ({
  formItems: [],
  disabled: false,
  addItem: (newFormState) => {
    set(
      (state) => {
        const updatedItems = state.formItems.map((item) => {
          if (item.isbn === newFormState.isbn) {
            return {
              ...item,
              quantity: item.quantity + Number(newFormState.quantity),
            };
          }
          return item;
        });
        const isISBNExisting = updatedItems.some(
          (item) => item.isbn === newFormState.isbn
        );

        if (!isISBNExisting) {
          updatedItems.push({
            ...newFormState,
            quantity: Number(newFormState.quantity),
            _id: state.formItems.length + 1,
            item: state.formItems.length + 1,
          });
        }

        return { formItems: updatedItems };
      },
      false,
      "formItems"
    );
    set({ disabled: true }, false, "disabled");
  },
  removeItem:(itemToRemove)=> {
    set(
      (state) => {
        const updatedItems = state.formItems.filter(
          (item) => item._id !== itemToRemove
        );

        if (updatedItems.length === 0) {
          set({ disabled: false }, false, "disabled");
        }

        const updatedItemsWithAdjustedItem = updatedItems.map((item) => {
          if (item._id > itemToRemove) {
            return {
              ...item,
              _id: item._id - 1,
              item: item.item - 1,
            };
          }
          return item;
        });
        return { formItems: updatedItemsWithAdjustedItem };
      },
      false,
      "formItems"
    );
  },

  clearItems:()=> {
    set({ disabled: false, formItems: [] }, false, "formItems");
  },
});
