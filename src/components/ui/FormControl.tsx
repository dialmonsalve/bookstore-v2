import { FocusEvent } from 'react';

interface FormControlProps {
  label: string;
  type: string;
  name: string;
  value?: string | number | readonly string[] | undefined;
  defaultValue?: string | number | readonly string[] | undefined;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
  disabled?: boolean
  placeholder?:string
  labelWidth? : string
  inputWidth? : string
}

export const FormControl = ({ label, type, name, value,labelWidth,inputWidth, defaultValue,placeholder, onBlur, onChange, disabled = false }: FormControlProps) => {

  return (
    <div className='form-control'>
      <label style={{width:labelWidth}} className={`form-control--label`}>{label}</label>
      <input
      style={{width:inputWidth}}
        className={`form-control--input ${disabled ? 'input-disabled': ''}`}
        type={type}
        name={name}
        placeholder={placeholder}
        onBlur={onBlur}
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
        disabled={disabled}
      />
    </div>
  )
}
