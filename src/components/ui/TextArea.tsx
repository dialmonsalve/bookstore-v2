import { useForm } from "@/hooks/useForm";
import { useFormStore } from "@/stores";
import { ErrorMessage } from "./";
import { ErrorMessages, InitialForm } from "@/types";

interface TextAreaProps {
  className?: string;
  name: string;
  label: string;
  initialForm: Record<string, any>;
  placeholder: string;
  errors?: ErrorMessages<InitialForm | undefined>;
}

export const TextArea = ({
  className,
  errors,
  label,
  name,
  initialForm,
  placeholder,

}: TextAreaProps) => {
  const { handleFieldChange } = useForm(initialForm);

  const formState = useFormStore((state) => state.formState);
  const isTouched = useFormStore((state) => state.isTouched);
  const isFormSubmitted = useFormStore((state) => state.isFormSubmitted);
  const handleBlur = useFormStore((state) => state.handleBlur);

  return (
    <div className={`form__area ${className}`}>
      <label className="form__label" htmlFor={name}>
        {label}
      </label>
      <textarea
        className={"form__input"}
        cols={30}
        id={name}
        name={name}
        placeholder={placeholder}
        rows={10}
        value={formState[name] || ""}
        onChange={handleFieldChange}
        onBlur={handleBlur}
      ></textarea>
      <ErrorMessage
        fieldName={errors?.[name]}
        isTouched={isTouched?.[name]}
        isFormSubmitted={isFormSubmitted}
      />
    </div>
  );
};
