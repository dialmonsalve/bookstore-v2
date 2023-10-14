import { useForm } from "@/hooks/useForm";
import { ErrorMessage } from "./";

import { FormOptions, useFormStore } from "@/store";

import { ErrorMessages, InitialForm } from "@/types";

interface FormControlProps {
  classNameControl?: string;
  classNameInput?: string;
  classNameLabel?: string;
  disabled?: boolean;
  errors?: ErrorMessages<InitialForm | undefined>;
  formFields: FormOptions[];
  initialForm: Record<string, any>;
}

export const FormControl = ({
  classNameControl,
  classNameInput,
  classNameLabel,
  disabled,
  errors,
  formFields,
  initialForm,
}: FormControlProps) => {
  const { handleFieldChange } = useForm(initialForm);

  const formState = useFormStore((state) => state.formState);
  const handleBlur = useFormStore((state) => state.handleBlur);
  const isTouched = useFormStore((state) => state.isTouched);
  const isFormSubmitted = useFormStore((state) => state.isFormSubmitted);

  if (formState === "undefined") return;

  return formFields.map((option) => (
    <div key={option._id}  className={classNameControl ? classNameControl : ""}>
      <label
        className={classNameLabel ? classNameLabel : ""}
        htmlFor={`${option.name}`}
      >
        {option.label} <span>{errors?.[option.name] && '*' }</span>
      </label>
      <input
        onKeyDown={(e)=> e.key === 'Enter' && e.preventDefault()}
        className={`${classNameInput ? classNameInput : ""} ${
          disabled ? "form__input--disabled" : ""
        } `}
        type={`${option.type}`}
        name={`${option.name}`}
        value={formState[option.name] || ""}
        placeholder={`${option.label}`}
        id={`${option.name}`}
        onChange={handleFieldChange}
        onBlur={handleBlur}
        autoComplete={`${option.type === "password" ? "off" : "on"}`}
        disabled={disabled}
      />
      <ErrorMessage
        fieldName={errors?.[option.name]}
        isTouched={isTouched?.[option.name]}
        isFormSubmitted={isFormSubmitted}
      />
    </div>
  ));
};
