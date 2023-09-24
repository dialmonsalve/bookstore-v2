import { ErrorMessages, ReactFocusEvent } from "@/types";
import { create, } from "zustand";
import { devtools } from "zustand/middleware";

export interface formOptions {
  _id: number,
  name: string,
  type: string,
  label: string,
}

interface State<T> {
  formState: T
  isTouched: T | null
  isFormSubmitted: boolean
}

interface Actions {
  setFormState: (formState: Record<string, any>) => void;
  handleResetForm: (initialState: Record<string, any>) => void;
  handleBlur: (e: ReactFocusEvent) => void;
  checkFormErrors: (errors: ErrorMessages<Record<string, any> | undefined>) => boolean
}

const UI_INITIAL_STATE: State<Record<string, any>> = {
  formState: {},
  isTouched: null,
  isFormSubmitted: false,
}

export const useFormStore = create<State<any> & Actions>()(devtools((set, get) => {

  return {
    ...UI_INITIAL_STATE,
    setFormState(formState) {
      set(state => ({ formState: { ...state.formState, ...formState } }), false, 'formState');
    },
    handleBlur: (e: ReactFocusEvent) => {
      const { name } = e.target;
      set((state) => ({ isTouched: { ...state.isTouched, [name]: true } }), false, 'isTouched')
    },
    checkFormErrors(errors) {
      set({ isFormSubmitted: true }, false, 'isFormSubmitted')
      if (!errors) {
        set({ isTouched: null, isFormSubmitted: false }, false, 'isFormSubmitted')
        return false;
      }
      return true;
    },
    handleResetForm(initialState) {
      set({ formState: initialState, isTouched: null, isFormSubmitted: false }, false, 'initialForm')
    }
  }
}, { name: "Form" }))
