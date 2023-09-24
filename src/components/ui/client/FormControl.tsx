import { ErrorMessage } from "./";

import { formOptions, useFormStore } from "@/store/form";

import { ErrorMessages, InitialForm, ReactChangeEvent } from "@/types";

interface FormControlProps {
  className?: string
  classNameInput?: string
  classNameLabel?: string
  disabled?: boolean
  errors?: ErrorMessages<InitialForm | undefined>
  formFields: formOptions[];
  handleFieldChange: (e: ReactChangeEvent) => void
}

export const FormControl = ({
  className, 
  classNameInput, 
  classNameLabel, 
  disabled, 
  errors, 
  formFields, 
  handleFieldChange
}: FormControlProps) => {

  const formState = useFormStore(state => state.formState);
  const handleBlur = useFormStore(state => state.handleBlur);
  const isTouched = useFormStore(state => state.isTouched);
  const isFormSubmitted = useFormStore(state => state.isFormSubmitted);

  return (
    formFields.map(option => (
      <div key={option._id} >
        <div className={className} >
          <label
            className={classNameLabel}
            htmlFor={`${option.name}`}>{option.label}</label>
          <input
            className={`${classNameInput} ${disabled ? 'input-disabled' : ''} `}
            type={`${option.type}`}
            name={`${option.name}`}
            value={formState[option.name] || ''}
            placeholder={`${option.label}`}
            id={`${option.name}`}
            onChange={handleFieldChange}
            onBlur={handleBlur}
            autoComplete={`${option.type === 'password' ? 'off' : 'on'}`}
            disabled={disabled}
          />
        </div>
        <ErrorMessage
          fieldName={errors?.[option.name]}
          isTouched={isTouched?.[option.name]}
          isFormSubmitted={isFormSubmitted}
        />
      </div>
    ))
  )
}