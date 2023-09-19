interface FormControlProps {
  label: string;
  type: string;
  name: string;
  value: string | number | readonly string[] | undefined;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
  disabled?: boolean
  placeholder?: string;
  autoComplete?: "on" | "off";
}

export const FormControl = ({ label, type, name, value,  placeholder, onBlur, onChange, disabled = false, autoComplete="on" }: FormControlProps) => {
  
  return (
    <div className='form-control'>
      <label htmlFor={name} className={`form-control__label`}>{label}</label>
      <input
      id={name}
        className={`form-control__input ${disabled ? 'input-disabled' : ''}`}
        type={type}
        name={name}
        placeholder={placeholder}
        onBlur={onBlur}
        value={value}
        onChange={onChange}
        disabled={disabled}
        autoComplete={autoComplete}
      />
    </div>
  )
}
