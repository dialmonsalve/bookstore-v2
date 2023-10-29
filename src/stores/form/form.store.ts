// import {  ReactFocusEvent } from "@/types";
import { create, type StateCreator } from "zustand";
import { devtools } from "zustand/middleware";
import { FormActions, FormState } from "../interfaces.store";

const storeForm: StateCreator<
  FormState<Record<string, any>> & FormActions,
  [["zustand/devtools", unknown]]
> = (set, get) => ({
  formState: {},
  isTouched: null,
  isFormSubmitted: false,
  options: [],
  optionTags: [],
  setFormState(formState) {
    set(
      (state) => ({ formState: { ...state.formState, ...formState } }),
      false,
      "formState"
    );
  },
  handleBlur: (e) => {
    const { id } = e.target;
    set(
      (state) => ({ isTouched: { ...state.isTouched, [id]: true } }),
      false,
      "isTouched"
    );
  },
  checkFormErrors: (errors) => {
    set({ isFormSubmitted: true }, false, "isFormSubmitted");
    if (!errors) {
      set(
        { isTouched: null, isFormSubmitted: false },
        false,
        "isFormSubmitted"
      );
      return false;
    }
    return true;
  },
  setOption: (name, options) => {
    set(
      (state) => ({
        ...state,
        formState: {
          ...state.formState,
          [name]: options,
        },
        options,
      }),
      false,
      "formState"
    );
  },
  setOptionTags: (name, optionTags) => {
    set(
      (state) => ({
        ...state,
        formState: {
          ...state.formState,
          [name]: optionTags,
        },
        optionTags,
      }),
      false,
      "formState"
    );
  },
  handleResetForm: (initialState) => {
    set(
      {
        formState: initialState,
        isTouched: null,
        isFormSubmitted: false,
        options: [],
        optionTags: [],
      },
      false,
      "initialForm"
    );
  },
});

export const useFormStore = create<FormState<any> & FormActions>()(
  devtools(storeForm, { name: "Form" })
);
