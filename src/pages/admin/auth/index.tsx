import React, { FormEvent } from 'react'

import { LoginForm } from '@/components/ui/LoginForm'
import { useForm } from '@/hooks/useForm';
import { formValidator, login, loginValidationSchema } from '@/helpers';

function PrivateLoginPage() {

  const {
    formState,
    isFormSubmitted,
    isTouched,
    handleFieldChange,
    handleBlur,
    areFieldsValid,
    handleResetForm
  } = useForm(login);

  const { email, password } = formState;

  const errors = formValidator().getErrors(formState, loginValidationSchema);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (areFieldsValid(errors)) {
      console.log({ email, password });

      // TODO implement validation vs backend
      
      handleResetForm()
    }
  }
  return (
    <main className='admin-login' >
      <h1 style={{ color: 'white' }} >Login</h1>
      <LoginForm
        formState={formState}
        errors={errors}
        isFormSubmitted={isFormSubmitted}
        isTouched={isTouched}
        onSubmit={handleSubmit}
        handleFieldChange={handleFieldChange}
        handleBlur={handleBlur}
      />
    </main>
  )
}

export default PrivateLoginPage