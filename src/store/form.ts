import { ErrorMessages, ReactFocusEvent } from "@/types";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

export interface FormOptions {
  _id: number;
  name: string;
  type: string;
  label: string;
  select?: string | string[];
}

interface State<T> {
  formState: T;
  isTouched: T | null;
  isFormSubmitted: boolean;
  options: string[] | string;
  optionTags: string[] | string;
}

interface Actions {
  setFormState: (formState: Record<string, any>) => void;
  handleResetForm: (initialState?: Record<string, any>) => void;
  handleBlur: (e: ReactFocusEvent) => void;
  checkFormErrors: (
    errors: ErrorMessages<Record<string, any> | undefined>
  ) => boolean;
  setOption: (name: string, option?: string[] | string) => void;
  setOptionTags: (name: string, optionTags?: string[] | string) => void;
}

const FORM_INITIAL_STATE: State<Record<string, any>> = {
  formState: {},
  isTouched: null,
  isFormSubmitted: false,
  options: [],
  optionTags: [],
};

export const useFormStore = create<State<any> & Actions>()(
  devtools(
    (set, get) => {
      return {
        ...FORM_INITIAL_STATE,
        setFormState(formState) {
          set(
            (state) => ({ formState: { ...state.formState, ...formState } }),
            false,
            "formState"
          );
        },
        handleBlur: (e: ReactFocusEvent) => {
          const { id } = e.target;
          set(
            (state) => ({ isTouched: { ...state.isTouched, [id]: true } }),
            false,
            "isTouched"
          );
        },
        checkFormErrors(errors) {
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
        setOption(name, options) {
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
        setOptionTags(name, optionTags) {
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
        handleResetForm(initialState) {
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
      };
    },
    { name: "Form" }
  )
);
