import { useFormStore } from "@/stores";

interface SingleFormControlProps {
  autoComplete?: "on" | "off";
  disabled?: boolean;
  label: string;
  name: string;
  placeholder?: string;
  type: string;
  value: string | number | readonly string[] | undefined;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

export const SingleFormControl = ({
  autoComplete = "on",
  disabled = false,
  label,
  name,
  placeholder,
  type,
  value,
  onChange,
}: SingleFormControlProps) => {
  const handleBlur = useFormStore((state) => state.handleBlur);

  return (
    <div className="form-control">
      <label htmlFor={name} className={`form-control__label`}>
        {label}
      </label>
      <input
        id={name}
        className={`form-control__input ${disabled ? "input-disabled" : ""}`}
        type={type}
        name={name}
        placeholder={placeholder}
        onBlur={handleBlur}
        value={value}
        onChange={onChange}
        disabled={disabled}
        autoComplete={autoComplete}
      />
    </div>
  );
};
