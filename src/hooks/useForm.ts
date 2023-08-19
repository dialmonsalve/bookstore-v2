import { useEffect, useState } from 'react';

import { ErrorMessages,IsTouched, ReactChangeEvent, ReactFocusEvent } from '../types';


export const useForm = <T>(initialForm: T) => {

  const [formState, setFormState] = useState(initialForm);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [isTouched, setIsTouched] = useState<IsTouched>(null);

  useEffect(() => {
    setFormState(initialForm);
  }, [initialForm]);


  const handleFieldChange = (e: ReactChangeEvent) => {
    const { name, value } = e.target; 
    setFormState((prevFormState) => ({
      ...prevFormState,
      [name]: value
    }));
  };

  const handleBlur = (e: ReactFocusEvent) => {
    const { name } = e.target;
    setIsTouched((prevIsTouched) => ({ ...prevIsTouched, [name]: true }));

    if (!isTouched?.name) {
      e.target.style.borderBottom = '3px solid rgb(233, 233, 233)';
    }
  };

  const areFieldsValid = (errors: ErrorMessages<typeof initialForm | undefined>) => {
    setIsFormSubmitted(true);
    if (errors) {
      return false;
    }
    setIsTouched(null);
    setIsFormSubmitted(false);
    return true;
  };
  const handleResetForm = () => {
    setFormState(initialForm);
  };

  return {
    formState,
    isFormSubmitted,
    isTouched,

    handleFieldChange,
    handleResetForm,
    areFieldsValid,
    handleBlur
  };
};