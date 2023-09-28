import { useForm } from "@/hooks/useForm";
import { useFormStore } from "@/store";

interface TextAreaProps {
  className: string;
  name: string;
  initialForm: Record<string, any>;
  placeholder: string;
}

export const TextArea = ({
  className,
  name,
  initialForm,
  placeholder,
}: TextAreaProps) => {
  
  const { handleFieldChange } = useForm(initialForm);
  const formState = useFormStore((state) => state.formState);

  return (
    <textarea
      name={name}
      id={name}
      cols={30}
      rows={10}
      value={formState[name] || ""}
      placeholder={placeholder}
      className={className}
      onChange={handleFieldChange}
    ></textarea>
  );
};
