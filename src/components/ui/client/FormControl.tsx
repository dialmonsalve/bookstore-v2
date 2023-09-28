import { useForm } from "@/hooks/useForm";
import { ErrorMessage } from "./";

import { formOptions, useFormStore } from "@/store/form";

import { ErrorMessages, InitialForm } from "@/types";

interface FormControlProps {
  className?: string
  classNameInput?: string
  classNameLabel?: string
  disabled?: boolean
  errors?: ErrorMessages<InitialForm | undefined>
  formFields: formOptions[];
  initialForm: Record<string, any>
}

export const FormControl = ({
  className,
  classNameInput,
  classNameLabel,
  disabled,
  errors,
  formFields,
  initialForm,
}: FormControlProps) => {

  const { handleFieldChange } = useForm(initialForm);

  const formState = useFormStore(state => state.formState);
  const handleBlur = useFormStore(state => state.handleBlur);
  const isTouched = useFormStore(state => state.isTouched);
  const isFormSubmitted = useFormStore(state => state.isFormSubmitted);

  if (formState === 'undefined') return

  return formFields.map((option) => (
    <div key={option._id} className="form-control">
      <label
        className={classNameLabel ? classNameLabel : ""}
        htmlFor={`${option.name}`}
      >
        {option.label}
      </label>
      <input
        className={`${classNameInput ? classNameInput : ""} ${
          disabled ? "input-disabled" : ""
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
}