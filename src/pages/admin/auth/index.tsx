import React, { FormEvent } from 'react'
import {  getSession } from "next-auth/react";

import { GetServerSideProps } from 'next';

import { ApiMessageError, LoginForm } from '@/components/ui'
import { useForm, useStaffLogin } from '@/hooks';
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

  const { username, password } = formState;

  const errors = formValidator().getErrors(formState, loginValidationSchema);

  const {setShowError, loginStaff, errorApiMessage, showError} = useStaffLogin()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setShowError(false);

    if (areFieldsValid(errors)) {
      handleResetForm()

      console.log(username, password);
      
      loginStaff({ username, password });
    }
  }
  return (
    <main className='admin-login' >
      <h1 style={{ color: 'white' }} >Login</h1>
      <ApiMessageError
      showError={showError}
      errorApiMessage={errorApiMessage}
      />
      <LoginForm
        formState={formState}
        errors={errors}
        isFormSubmitted={isFormSubmitted}
        isTouched={isTouched}
        onSubmit={handleSubmit}
        handleFieldChange={handleFieldChange}
        handleBlur={handleBlur}
        isStaff
      />
    </main>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {

  const session = await getSession({ req });

  const { p = '/admin' } = query;

  if (session) {
    return {
      redirect: {
        destination: p.toString(),
        permanent: false
      }
    }
  }

  return {
    props: {

    }
  }
}

export default PrivateLoginPage