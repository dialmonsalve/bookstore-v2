import { create, } from "zustand"
import { devtools } from "zustand/middleware"

interface InitialForm {
  [k: string]: Record<string, any>
}

interface State<T> {
  formItems: T[];
  disabled: boolean
}

interface Actions {
  handleAddItem: (newFormState: Record<string, any>) => void;
  handleRemoveItem: (itemToRemove: number | string) => void;
  clearAllItems: () => void
}

const UI_INITIAL_STATE: State<InitialForm> = {
  formItems: [],
  disabled: false
}

export const useUITransactionStore = create<State<any> & Actions>()(devtools((set, get) => {

  return {
    ...UI_INITIAL_STATE,
    handleAddItem: (newFormState) => {

      set(state => {
        const updatedItems = state.formItems.map(item => {
          if (item.code === newFormState.code) {
            return {
              ...item,
              quantity: item.quantity + Number(newFormState.quantity)
            };
          }
          return item;
        });
        const isCodeExisting = updatedItems.some(item => item.code === newFormState.code);

        if (!isCodeExisting) {
          updatedItems.push({
            ...newFormState,
            quantity: Number(newFormState.quantity),
            _id: state.formItems.length + 1,
            item: state.formItems.length + 1,
          });
        }

        return { formItems: updatedItems, };
      }, false, 'addItem')
      set({ disabled: true }, false, 'disabled')
    },

    handleRemoveItem(itemToRemove) {
      set(state => {
        const updatedItems = state.formItems.filter(item => item._id !== itemToRemove);

        if (updatedItems.length === 0) {
          set({ disabled: false })
        }

        const updatedItemsWithAdjustedItem = updatedItems.map(item => {
          if (item._id > itemToRemove) {
            return {
              ...item,
              _id: item._id - 1,
              item: item.item - 1,
            };
          }
          return item;
        });
        return { formItems: updatedItemsWithAdjustedItem }
      })
    },
    clearAllItems() {
      set({ disabled: false, formItems: [] })
    }
  }
}, { name: "Transactions Interface" }))